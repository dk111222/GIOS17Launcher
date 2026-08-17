package com.cloudx.ios17.core.utils

import android.app.WallpaperManager
import android.os.IBinder
import android.util.Log
import android.view.View
import java.lang.reflect.Method

class DepthManager(private val launcher: com.cloudx.ios17.features.launcher.LauncherActivity) {

    private val wallpaperManager = launcher.getSystemService(WallpaperManager::class.java)
    private val setWallpaperZoomOut: Method? = resolveSetWallpaperZoomOut()

    init {
        launcher.rootView.addOnAttachStateChangeListener(
            object : View.OnAttachStateChangeListener {
                override fun onViewAttachedToWindow(v: View) {
                    updateDepth()
                }

                override fun onViewDetachedFromWindow(v: View) {}
            }
        )
    }

    fun updateDepth() {
        val method = setWallpaperZoomOut ?: return
        val manager = wallpaperManager ?: return
        val windowToken = launcher.rootView.windowToken ?: return
        try {
            method.invoke(manager, windowToken, 1f)
        } catch (t: Throwable) {
            Log.w(TAG, "setWallpaperZoomOut is unavailable on this device", t)
        }
    }

    private fun resolveSetWallpaperZoomOut(): Method? {
        return try {
            WallpaperManager::class.java.getMethod(
                "setWallpaperZoomOut",
                IBinder::class.java,
                java.lang.Float.TYPE
            )
        } catch (t: Throwable) {
            Log.w(TAG, "WallpaperManager.setWallpaperZoomOut not accessible", t)
            null
        }
    }

    private companion object {
        const val TAG = "DepthManager"
    }
}
