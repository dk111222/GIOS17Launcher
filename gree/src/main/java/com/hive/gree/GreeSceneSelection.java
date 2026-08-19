package com.hive.gree;

import android.content.Context;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

/** Persists the globally selected scene across GreeLivePage and GreeAllDevicesActivity. */
final class GreeSceneSelection {

    private static final String KEY_SELECTED_SCENE_ID = "selected_scene_id";

    private GreeSceneSelection() {
    }

    @Nullable
    static String getSelectedSceneId(@NonNull Context context) {
        String id = GreeDeviceCatalog.getPrefs(context).getString(KEY_SELECTED_SCENE_ID, null);
        if (id == null || id.trim().isEmpty()) {
            return null;
        }
        return GreeSceneCatalog.findById(id) != null ? id : null;
    }

    static void setSelectedSceneId(@NonNull Context context, @Nullable String sceneId) {
        if (sceneId == null || sceneId.trim().isEmpty()) {
            GreeDeviceCatalog.getPrefs(context).edit().remove(KEY_SELECTED_SCENE_ID).apply();
            return;
        }
        if (GreeSceneCatalog.findById(sceneId) == null) {
            return;
        }
        GreeDeviceCatalog.getPrefs(context).edit()
                .putString(KEY_SELECTED_SCENE_ID, sceneId)
                .apply();
    }

    static void toggleSceneSelection(@NonNull Context context, @NonNull String sceneId) {
        String current = getSelectedSceneId(context);
        if (sceneId.equals(current)) {
            setSelectedSceneId(context, null);
        } else {
            setSelectedSceneId(context, sceneId);
        }
    }

    static void applySelection(@NonNull Context context, @NonNull View[] cards,
            @NonNull String[] sceneIds) {
        String selectedId = getSelectedSceneId(context);
        for (int i = 0; i < cards.length; i++) {
            View card = cards[i];
            if (card == null) {
                continue;
            }
            card.setSelected(selectedId != null && selectedId.equals(sceneIds[i]));
        }
    }
}
