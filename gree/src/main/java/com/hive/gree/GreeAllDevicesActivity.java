package com.hive.gree;

import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

public class GreeAllDevicesActivity extends AppCompatActivity {

    private static final Object ENV_MARKER = new Object();

    private enum BannerKind {
        LIVING,
        MASTER
    }

    private final LinkedHashSet<String> selectedIds = new LinkedHashSet<>();
    private final Map<String, Boolean> powerStates = new HashMap<>();
    private final List<Object> rows = new ArrayList<>();

    private TextView titleView;
    private TextView extraView;
    private TextView summaryView;
    private LinearLayout roomChipRow;
    private LinearLayout homeChipRow;
    private RoomContentAdapter adapter;

    private String currentRoom = GreeDeviceCatalog.ROOM_ALL;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setupTransparentStatusBar();
        setContentView(R.layout.activity_gree_all_devices);

        titleView = findViewById(R.id.gree_all_devices_title);
        extraView = findViewById(R.id.gree_all_devices_extra);
        summaryView = findViewById(R.id.gree_all_devices_summary);
        roomChipRow = findViewById(R.id.gree_all_devices_room_chips);
        homeChipRow = findViewById(R.id.gree_all_devices_home_chips);

        selectedIds.addAll(GreeDeviceCatalog.getSelectedDeviceIds(this));
        for (GreeDeviceCatalog.FullDevice device : GreeDeviceCatalog.getAllFullDevices()) {
            powerStates.put(device.id, device.defaultOn);
        }

        RecyclerView recyclerView = findViewById(R.id.gree_all_devices_list);
        GridLayoutManager layoutManager = new GridLayoutManager(this, 2);
        adapter = new RoomContentAdapter();
        layoutManager.setSpanSizeLookup(new GridLayoutManager.SpanSizeLookup() {
            @Override
            public int getSpanSize(int position) {
                int type = adapter.getItemViewType(position);
                return type == RoomContentAdapter.TYPE_ENV || type == RoomContentAdapter.TYPE_BANNER ? 2 : 1;
            }
        });
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.setAdapter(adapter);
        int gap = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 9f,
                getResources().getDisplayMetrics());
        recyclerView.addItemDecoration(new RecyclerView.ItemDecoration() {
            @Override
            public void getItemOffsets(@NonNull android.graphics.Rect outRect, @NonNull View view,
                    @NonNull RecyclerView parent, @NonNull RecyclerView.State state) {
                outRect.set(gap / 2, gap / 2, gap / 2, gap / 2);
            }
        });

        bindRoomChips();
        bindHomeChips();
        refreshRows();
        updateHeader();
        updateSummary();

        findViewById(R.id.gree_all_devices_back).setOnClickListener(v -> finish());
        findViewById(R.id.gree_all_devices_done).setOnClickListener(v -> saveAndFinish());
    }

    private void setupTransparentStatusBar() {
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        WindowInsetsControllerCompat controller =
                new WindowInsetsControllerCompat(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(true);
        getWindow().getDecorView().post(() -> {
            View root = findViewById(R.id.gree_all_devices_root);
            if (root == null) {
                return;
            }
            final int start = root.getPaddingStart();
            final int top = root.getPaddingTop();
            final int end = root.getPaddingEnd();
            final int bottom = root.getPaddingBottom();
            ViewCompat.setOnApplyWindowInsetsListener(root, (v, insets) -> {
                int insetTop = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top;
                int insetBottom = insets.getInsets(WindowInsetsCompat.Type.navigationBars()).bottom;
                v.setPaddingRelative(start, top + insetTop, end, bottom + insetBottom);
                return insets;
            });
            ViewCompat.requestApplyInsets(root);
        });
    }

    private void bindRoomChips() {
        roomChipRow.removeAllViews();
        int margin = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 8f,
                getResources().getDisplayMetrics());
        for (String room : GreeDeviceCatalog.getSwitcherRooms()) {
            TextView chip = createChip(room, room.equals(currentRoom));
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            if (roomChipRow.getChildCount() > 0) {
                params.setMarginStart(margin);
            }
            chip.setOnClickListener(v -> selectRoom(room));
            roomChipRow.addView(chip, params);
        }
    }

    private void bindHomeChips() {
        homeChipRow.removeAllViews();
        int margin = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 8f,
                getResources().getDisplayMetrics());
        for (GreeDeviceCatalog.DeviceItem item : GreeDeviceCatalog.getAllDevices()) {
            TextView chip = createChip(getString(item.titleRes), selectedIds.contains(item.id));
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            if (homeChipRow.getChildCount() > 0) {
                params.setMarginStart(margin);
            }
            chip.setOnClickListener(v -> toggleHomeSelection(item));
            homeChipRow.addView(chip, params);
        }
    }

    private TextView createChip(String label, boolean selected) {
        TextView chip = new TextView(this);
        chip.setText(label);
        chip.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13f);
        chip.setGravity(Gravity.CENTER);
        int padH = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 14f,
                getResources().getDisplayMetrics());
        int padV = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 8f,
                getResources().getDisplayMetrics());
        chip.setPadding(padH, padV, padH, padV);
        applyChipStyle(chip, selected);
        return chip;
    }

    private void applyChipStyle(TextView chip, boolean selected) {
        chip.setBackgroundResource(selected ? R.drawable.gree_chip_on : R.drawable.gree_chip_off);
        chip.setTextColor(selected
                ? ContextCompat.getColor(this, android.R.color.white)
                : ContextCompat.getColor(this, R.color.gree_neo_ink));
        if (selected) {
            chip.setTypeface(chip.getTypeface(), android.graphics.Typeface.BOLD);
        } else {
            chip.setTypeface(chip.getTypeface(), android.graphics.Typeface.NORMAL);
        }
    }

    private void selectRoom(String room) {
        if (currentRoom.equals(room)) {
            return;
        }
        currentRoom = room;
        bindRoomChips();
        refreshRows();
        updateHeader();
    }

    private void refreshRows() {
        rows.clear();
        rows.add(ENV_MARKER);
        if ("客厅".equals(currentRoom)) {
            rows.add(BannerKind.LIVING);
        } else if ("主卧".equals(currentRoom)) {
            rows.add(BannerKind.MASTER);
        }
        rows.addAll(GreeDeviceCatalog.getSortedDevicesForRoom(currentRoom));
        adapter.notifyDataSetChanged();
    }

    private void updateHeader() {
        titleView.setText(currentRoom);
        List<GreeDeviceCatalog.FullDevice> devices = GreeDeviceCatalog.getSortedDevicesForRoom(currentRoom);
        int running = GreeDeviceCatalog.countRunningInRoom(currentRoom, powerStates);
        GreeDeviceCatalog.RoomInfo roomInfo = GreeDeviceCatalog.findRoomInfo(currentRoom);
        if (roomInfo != null) {
            String occupancy = roomInfo.occupied
                    ? getString(R.string.gree_all_devices_occupied)
                    : getString(R.string.gree_all_devices_vacant);
            extraView.setText(getString(R.string.gree_all_devices_extra, occupancy, running, devices.size()));
        } else {
            extraView.setText(getString(R.string.gree_all_devices_extra_no_occ, running, devices.size()));
        }
    }

    private void updateSummary() {
        summaryView.setText(getString(R.string.gree_all_devices_summary, selectedIds.size(),
                GreeDeviceCatalog.MAX_VISIBLE_DEVICES));
    }

    private void toggleHomeSelection(GreeDeviceCatalog.DeviceItem item) {
        if (selectedIds.contains(item.id)) {
            if (selectedIds.size() == 1) {
                Toast.makeText(this, R.string.gree_all_devices_min_tip, Toast.LENGTH_SHORT).show();
                return;
            }
            selectedIds.remove(item.id);
        } else {
            if (selectedIds.size() >= GreeDeviceCatalog.MAX_VISIBLE_DEVICES) {
                Toast.makeText(this, R.string.gree_all_devices_max_tip, Toast.LENGTH_SHORT).show();
                return;
            }
            selectedIds.add(item.id);
        }
        bindHomeChips();
        updateSummary();
    }

    private boolean isDeviceOn(GreeDeviceCatalog.FullDevice device) {
        Boolean on = powerStates.get(device.id);
        return on != null ? on : device.defaultOn;
    }

    private void toggleDevicePower(GreeDeviceCatalog.FullDevice device) {
        boolean next = !isDeviceOn(device);
        powerStates.put(device.id, next);
        updateHeader();
        adapter.notifyDataSetChanged();
        Toast.makeText(this, getString(R.string.gree_device_power_toggled, device.name,
                next ? getString(R.string.gree_device_power_on) : getString(R.string.gree_device_power_off)),
                Toast.LENGTH_SHORT).show();
    }

    private void saveAndFinish() {
        GreeDeviceCatalog.setSelectedDeviceIds(this, new ArrayList<>(selectedIds));
        finish();
    }

    private final class RoomContentAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
        static final int TYPE_ENV = 0;
        static final int TYPE_BANNER = 1;
        static final int TYPE_DEVICE = 2;

        @Override
        public int getItemViewType(int position) {
            Object row = rows.get(position);
            if (row == ENV_MARKER) {
                return TYPE_ENV;
            }
            if (row instanceof BannerKind) {
                return TYPE_BANNER;
            }
            return TYPE_DEVICE;
        }

        @NonNull
        @Override
        public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            if (viewType == TYPE_ENV) {
                View view = getLayoutInflater().inflate(R.layout.item_gree_room_env, parent, false);
                return new EnvHolder(view);
            }
            if (viewType == TYPE_BANNER) {
                View view = getLayoutInflater().inflate(R.layout.item_gree_room_banner, parent, false);
                return new BannerHolder(view);
            }
            View view = getLayoutInflater().inflate(R.layout.item_gree_room_device, parent, false);
            return new DeviceHolder(view);
        }

        @Override
        public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
            Object row = rows.get(position);
            if (holder instanceof EnvHolder) {
                bindEnv((EnvHolder) holder);
            } else if (holder instanceof BannerHolder) {
                bindBanner((BannerHolder) holder, (BannerKind) row);
            } else if (holder instanceof DeviceHolder) {
                bindDevice((DeviceHolder) holder, (GreeDeviceCatalog.FullDevice) row);
            }
        }

        @Override
        public int getItemCount() {
            return rows.size();
        }

        private void bindEnv(EnvHolder holder) {
            GreeDeviceCatalog.AirQuality air = GreeDeviceCatalog.getAirForRoom(currentRoom);
            holder.temp.setText(String.format("%.1f°C", air.temperature));
            holder.humid.setText(air.humidity + "%");
            holder.aqi.setText(air.aqi);
            int aqiColor = "优".equals(air.aqi)
                    ? ContextCompat.getColor(GreeAllDevicesActivity.this, R.color.gree_aqi_good)
                    : ContextCompat.getColor(GreeAllDevicesActivity.this, R.color.gree_aqi_fair);
            holder.aqi.setTextColor(aqiColor);
        }

        private void bindBanner(BannerHolder holder, BannerKind kind) {
            if (kind == BannerKind.LIVING) {
                holder.title.setText(R.string.gree_banner_living_title);
                holder.desc.setText(R.string.gree_banner_living_desc);
            } else {
                holder.title.setText(R.string.gree_banner_master_title);
                holder.desc.setText(R.string.gree_banner_master_desc);
            }
        }

        private void bindDevice(DeviceHolder holder, GreeDeviceCatalog.FullDevice device) {
            boolean on = isDeviceOn(device);
            holder.name.setText(device.name);
            holder.status.setText(device.room + " · " + device.getStatus(on));
            int statusColor = on
                    ? ContextCompat.getColor(GreeAllDevicesActivity.this, R.color.gree_neo_accent_dark)
                    : ContextCompat.getColor(GreeAllDevicesActivity.this, R.color.gree_neo_ink3);
            holder.status.setTextColor(statusColor);

            int typeColor = ContextCompat.getColor(GreeAllDevicesActivity.this,
                    GreeDeviceCatalog.getTypeColorRes(device.type));
            GradientDrawable iconBg = new GradientDrawable();
            iconBg.setCornerRadius(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 13f,
                    getResources().getDisplayMetrics()));
            if (on) {
                iconBg.setColor(typeColor);
            } else {
                iconBg.setColor(ContextCompat.getColor(GreeAllDevicesActivity.this, R.color.gree_plus_chip_bg));
            }
            holder.iconFrame.setBackground(iconBg);
            holder.icon.setImageResource(GreeDeviceCatalog.getTypeIconRes(device.type));
            if (on) {
                holder.icon.setColorFilter(Color.WHITE);
            } else {
                holder.icon.setColorFilter(ContextCompat.getColor(GreeAllDevicesActivity.this,
                        R.color.gree_dca_icon_off));
            }

            holder.power.setBackgroundResource(on ? R.drawable.gree_dca_power_on : R.drawable.gree_dca_power_off);
            holder.power.setColorFilter(on ? Color.WHITE : ContextCompat.getColor(GreeAllDevicesActivity.this,
                    R.color.gree_dca_icon_off));
            holder.power.setOnClickListener(v -> toggleDevicePower(device));
            holder.itemView.setOnClickListener(v -> Toast.makeText(GreeAllDevicesActivity.this,
                    getString(R.string.gree_toast_demo, device.name), Toast.LENGTH_SHORT).show());
        }

        final class EnvHolder extends RecyclerView.ViewHolder {
            final TextView temp;
            final TextView humid;
            final TextView aqi;

            EnvHolder(@NonNull View itemView) {
                super(itemView);
                temp = itemView.findViewById(R.id.gree_env_temp);
                humid = itemView.findViewById(R.id.gree_env_humid);
                aqi = itemView.findViewById(R.id.gree_env_aqi);
            }
        }

        final class BannerHolder extends RecyclerView.ViewHolder {
            final TextView title;
            final TextView desc;

            BannerHolder(@NonNull View itemView) {
                super(itemView);
                title = itemView.findViewById(R.id.gree_room_banner_title);
                desc = itemView.findViewById(R.id.gree_room_banner_desc);
            }
        }

        final class DeviceHolder extends RecyclerView.ViewHolder {
            final View iconFrame;
            final ImageView icon;
            final ImageButton power;
            final TextView name;
            final TextView status;

            DeviceHolder(@NonNull View itemView) {
                super(itemView);
                iconFrame = itemView.findViewById(R.id.gree_room_device_icon_frame);
                icon = itemView.findViewById(R.id.gree_room_device_icon);
                power = itemView.findViewById(R.id.gree_room_device_power);
                name = itemView.findViewById(R.id.gree_room_device_name);
                status = itemView.findViewById(R.id.gree_room_device_status);
            }
        }
    }
}
