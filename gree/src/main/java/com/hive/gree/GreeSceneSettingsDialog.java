package com.hive.gree;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.List;

final class GreeSceneSettingsDialog {

    interface OnScenesChangedListener {
        void onScenesChanged();
    }

    private GreeSceneSettingsDialog() {
    }

    static void show(@NonNull Context context, @NonNull OnScenesChangedListener listener) {
        Dialog dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setCancelable(true);

        View content = LayoutInflater.from(context).inflate(R.layout.dialog_gree_scene_settings, null, false);
        LinearLayout list = content.findViewById(R.id.scene_settings_list);
        View sheet = content.findViewById(R.id.scene_settings_sheet);
        content.findViewById(R.id.scene_settings_root).setOnClickListener(v -> dialog.dismiss());
        sheet.setOnClickListener(v -> {
            // Keep taps inside the sheet from closing the dialog.
        });

        List<String> enabledIds = new ArrayList<>(GreeSceneCatalog.getEnabledSceneIds(context));
        LayoutInflater inflater = LayoutInflater.from(context);

        for (GreeSceneCatalog.SceneItem scene : GreeSceneCatalog.getAllScenes()) {
            View row = inflater.inflate(R.layout.item_gree_scene_setting_row, list, false);
            ImageView icon = row.findViewById(R.id.scene_setting_icon);
            TextView title = row.findViewById(R.id.scene_setting_title);
            TextView desc = row.findViewById(R.id.scene_setting_desc);
            ImageView switchView = row.findViewById(R.id.scene_setting_switch);

            icon.setImageResource(scene.iconRes);
            GreeImageClip.clipRound(icon, dp(context, 10));
            title.setText(scene.titleRes);
            desc.setText(scene.descRes);
            switchView.setSelected(enabledIds.contains(scene.id));

            row.setOnClickListener(v -> {
                boolean isOn = enabledIds.contains(scene.id);
                if (isOn) {
                    if (enabledIds.size() <= GreeSceneCatalog.MIN_VISIBLE_SCENES) {
                        toast(context, R.string.gree_scene_settings_min);
                        return;
                    }
                    enabledIds.remove(scene.id);
                } else {
                    if (enabledIds.size() >= GreeSceneCatalog.MAX_VISIBLE_SCENES) {
                        toast(context, R.string.gree_scene_settings_max);
                        return;
                    }
                    enabledIds.add(scene.id);
                }
                GreeSceneCatalog.setEnabledSceneIds(context, enabledIds);
                switchView.setSelected(enabledIds.contains(scene.id));
                listener.onScenesChanged();
            });

            if (list.getChildCount() > 0) {
                View divider = new View(context);
                divider.setBackgroundColor(Color.parseColor("#F3F4F6"));
                LinearLayout.LayoutParams dividerLp = new LinearLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT, 1);
                list.addView(divider, dividerLp);
            }
            list.addView(row);
        }

        dialog.setContentView(content);
        Window window = dialog.getWindow();
        if (window != null) {
            window.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            window.setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
            window.setGravity(Gravity.BOTTOM);
            WindowManager.LayoutParams params = window.getAttributes();
            params.dimAmount = 0f;
            window.setAttributes(params);
        }
        dialog.show();
    }

    private static void toast(Context context, int resId) {
        Toast.makeText(context, resId, Toast.LENGTH_SHORT).show();
    }

    private static int dp(Context context, float value) {
        return Math.round(value * context.getResources().getDisplayMetrics().density);
    }
}
