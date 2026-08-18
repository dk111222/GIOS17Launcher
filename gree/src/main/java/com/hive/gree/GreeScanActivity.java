package com.hive.gree;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.ImageFormat;
import android.graphics.SurfaceTexture;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCaptureSession;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraDevice;
import android.hardware.camera2.CameraManager;
import android.hardware.camera2.CaptureRequest;
import android.media.Image;
import android.media.ImageReader;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.Size;
import android.view.Surface;
import android.view.TextureView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.google.zxing.BinaryBitmap;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.PlanarYUVLuminanceSource;
import com.google.zxing.Result;
import com.google.zxing.common.HybridBinarizer;

import java.nio.ByteBuffer;
import java.util.Arrays;

/** Camera QR / barcode scanner launched from the minus-one screen. */
public class GreeScanActivity extends AppCompatActivity {

    private TextureView previewView;
    private CameraDevice cameraDevice;
    private CameraCaptureSession captureSession;
    private ImageReader imageReader;
    private HandlerThread cameraThread;
    private Handler cameraHandler;
    private final MultiFormatReader barcodeReader = new MultiFormatReader();
    private boolean handledResult;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setupTransparentStatusBar();
        setContentView(R.layout.activity_gree_scan);
        previewView = findViewById(R.id.gree_scan_preview);
        findViewById(R.id.gree_scan_back).setOnClickListener(v -> finish());
    }

    private void setupTransparentStatusBar() {
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        WindowInsetsControllerCompat controller =
                new WindowInsetsControllerCompat(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(false);
        getWindow().getDecorView().post(() -> {
            android.view.View topBar = findViewById(R.id.gree_scan_top_bar);
            if (topBar == null) {
                return;
            }
            final int start = topBar.getPaddingStart();
            final int top = topBar.getPaddingTop();
            final int end = topBar.getPaddingEnd();
            final int bottom = topBar.getPaddingBottom();
            ViewCompat.setOnApplyWindowInsetsListener(topBar, (v, insets) -> {
                int insetTop = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top;
                v.setPaddingRelative(start, top + insetTop, end, bottom);
                return insets;
            });
            ViewCompat.requestApplyInsets(topBar);
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        handledResult = false;
        startCameraThread();
        if (previewView.isAvailable()) {
            openCamera();
        } else {
            previewView.setSurfaceTextureListener(new TextureView.SurfaceTextureListener() {
                @Override
                public void onSurfaceTextureAvailable(@NonNull SurfaceTexture surface, int width, int height) {
                    openCamera();
                }

                @Override
                public void onSurfaceTextureSizeChanged(@NonNull SurfaceTexture surface, int width, int height) {
                }

                @Override
                public boolean onSurfaceTextureDestroyed(@NonNull SurfaceTexture surface) {
                    return true;
                }

                @Override
                public void onSurfaceTextureUpdated(@NonNull SurfaceTexture surface) {
                }
            });
        }
    }

    @Override
    protected void onPause() {
        closeCamera();
        stopCameraThread();
        super.onPause();
    }

    private void startCameraThread() {
        cameraThread = new HandlerThread("GreeScan");
        cameraThread.start();
        cameraHandler = new Handler(cameraThread.getLooper());
    }

    private void stopCameraThread() {
        if (cameraThread != null) {
            cameraThread.quitSafely();
            try {
                cameraThread.join();
            } catch (InterruptedException ignored) {
            }
            cameraThread = null;
            cameraHandler = null;
        }
    }

    @SuppressLint("MissingPermission")
    private void openCamera() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(this, R.string.gree_scan_permission_denied, Toast.LENGTH_SHORT).show();
            finish();
            return;
        }
        CameraManager manager = (CameraManager) getSystemService(CAMERA_SERVICE);
        try {
            String cameraId = findBackCameraId(manager);
            if (cameraId == null) {
                showUnavailable();
                return;
            }
            Size previewSize = choosePreviewSize(manager.getCameraCharacteristics(cameraId));
            SurfaceTexture texture = previewView.getSurfaceTexture();
            if (texture == null) {
                showUnavailable();
                return;
            }
            texture.setDefaultBufferSize(previewSize.getWidth(), previewSize.getHeight());
            imageReader = ImageReader.newInstance(
                    previewSize.getWidth(), previewSize.getHeight(), ImageFormat.YUV_420_888, 2);
            imageReader.setOnImageAvailableListener(this::onPreviewFrame, cameraHandler);
            manager.openCamera(cameraId, new CameraDevice.StateCallback() {
                @Override
                public void onOpened(@NonNull CameraDevice camera) {
                    cameraDevice = camera;
                    startPreview(texture);
                }

                @Override
                public void onDisconnected(@NonNull CameraDevice camera) {
                    camera.close();
                    cameraDevice = null;
                }

                @Override
                public void onError(@NonNull CameraDevice camera, int error) {
                    camera.close();
                    cameraDevice = null;
                    showUnavailable();
                }
            }, cameraHandler);
        } catch (CameraAccessException | SecurityException e) {
            showUnavailable();
        }
    }

    private String findBackCameraId(CameraManager manager) throws CameraAccessException {
        String fallback = null;
        for (String id : manager.getCameraIdList()) {
            CameraCharacteristics characteristics = manager.getCameraCharacteristics(id);
            Integer facing = characteristics.get(CameraCharacteristics.LENS_FACING);
            if (facing != null && facing == CameraCharacteristics.LENS_FACING_BACK) {
                return id;
            }
            if (fallback == null) {
                fallback = id;
            }
        }
        return fallback;
    }

    private Size choosePreviewSize(CameraCharacteristics characteristics) {
        Size fallback = new Size(1280, 720);
        android.hardware.camera2.params.StreamConfigurationMap map =
                characteristics.get(CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP);
        if (map == null) {
            return fallback;
        }
        Size[] sizes = map.getOutputSizes(SurfaceTexture.class);
        if (sizes == null || sizes.length == 0) {
            return fallback;
        }
        Size best = sizes[0];
        int target = 1280 * 720;
        int bestDelta = Math.abs(best.getWidth() * best.getHeight() - target);
        for (Size size : sizes) {
            int delta = Math.abs(size.getWidth() * size.getHeight() - target);
            if (delta < bestDelta) {
                best = size;
                bestDelta = delta;
            }
        }
        return best;
    }

    private void startPreview(SurfaceTexture texture) {
        if (cameraDevice == null || imageReader == null) {
            return;
        }
        Surface previewSurface = new Surface(texture);
        Surface readerSurface = imageReader.getSurface();
        try {
            CaptureRequest.Builder builder = cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW);
            builder.addTarget(previewSurface);
            builder.addTarget(readerSurface);
            builder.set(CaptureRequest.CONTROL_AF_MODE, CaptureRequest.CONTROL_AF_MODE_CONTINUOUS_PICTURE);
            cameraDevice.createCaptureSession(Arrays.asList(previewSurface, readerSurface),
                    new CameraCaptureSession.StateCallback() {
                        @Override
                        public void onConfigured(@NonNull CameraCaptureSession session) {
                            captureSession = session;
                            try {
                                session.setRepeatingRequest(builder.build(), null, cameraHandler);
                            } catch (CameraAccessException ignored) {
                            }
                        }

                        @Override
                        public void onConfigureFailed(@NonNull CameraCaptureSession session) {
                            showUnavailable();
                        }
                    }, cameraHandler);
        } catch (CameraAccessException e) {
            showUnavailable();
        }
    }

    private void onPreviewFrame(ImageReader reader) {
        Image image = reader.acquireLatestImage();
        if (image == null || handledResult) {
            if (image != null) {
                image.close();
            }
            return;
        }
        try {
            Result result = decode(image);
            if (result != null) {
                handledResult = true;
                String text = result.getText();
                runOnUiThread(() -> handleScanResult(text));
            }
        } finally {
            image.close();
        }
    }

    private Result decode(Image image) {
        Image.Plane yPlane = image.getPlanes()[0];
        ByteBuffer buffer = yPlane.getBuffer();
        int width = image.getWidth();
        int height = image.getHeight();
        int rowStride = yPlane.getRowStride();
        byte[] data = new byte[rowStride * height];
        int toCopy = Math.min(buffer.remaining(), data.length);
        buffer.get(data, 0, toCopy);
        PlanarYUVLuminanceSource source = new PlanarYUVLuminanceSource(
                data, rowStride, height, 0, 0, Math.min(width, rowStride), height, false);
        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
        try {
            return barcodeReader.decodeWithState(bitmap);
        } catch (NotFoundException e) {
            return null;
        } finally {
            barcodeReader.reset();
        }
    }

    private void handleScanResult(String text) {
        if (text == null || text.trim().isEmpty()) {
            return;
        }
        String value = text.trim();
        if (value.startsWith("http://") || value.startsWith("https://")) {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(value)));
        } else {
            Toast.makeText(this, value, Toast.LENGTH_LONG).show();
        }
        finish();
    }

    private void closeCamera() {
        if (captureSession != null) {
            captureSession.close();
            captureSession = null;
        }
        if (cameraDevice != null) {
            cameraDevice.close();
            cameraDevice = null;
        }
        if (imageReader != null) {
            imageReader.close();
            imageReader = null;
        }
    }

    private void showUnavailable() {
        runOnUiThread(() -> {
            Toast.makeText(this, R.string.gree_scan_camera_unavailable, Toast.LENGTH_SHORT).show();
            finish();
        });
    }
}
