package com.hive.gree;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;
import androidx.annotation.StringRes;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

final class GreeSceneCatalog {

    static final String KEY_ENABLED_SCENE_IDS = "m1_scenes";
    static final int MAX_VISIBLE_SCENES = 4;
    static final int MIN_VISIBLE_SCENES = 1;

    private static final String[] SCENE_ORDER = {"home", "away", "movie", "sleep", "guest", "eco"};

    private GreeSceneCatalog() {
    }

    static final class SceneItem {
        final String id;
        @StringRes final int titleRes;
        @StringRes final int descRes;
        @DrawableRes final int iconRes;

        SceneItem(String id, int titleRes, int descRes, int iconRes) {
            this.id = id;
            this.titleRes = titleRes;
            this.descRes = descRes;
            this.iconRes = iconRes;
        }
    }

    @NonNull
    static List<SceneItem> getAllScenes() {
        List<SceneItem> items = new ArrayList<>();
        items.add(new SceneItem("home", R.string.gree_scene_home, R.string.gree_scene_home_desc, R.drawable.sc_home));
        items.add(new SceneItem("away", R.string.gree_scene_away, R.string.gree_scene_away_desc, R.drawable.sc_away));
        items.add(new SceneItem("movie", R.string.gree_scene_movie, R.string.gree_scene_movie_desc, R.drawable.sc_movie));
        items.add(new SceneItem("sleep", R.string.gree_scene_sleep, R.string.gree_scene_sleep_desc, R.drawable.sc_sleep));
        items.add(new SceneItem("guest", R.string.gree_scene_guest, R.string.gree_scene_guest_desc, R.drawable.sc_guest));
        items.add(new SceneItem("eco", R.string.gree_scene_eco, R.string.gree_scene_eco_desc, R.drawable.sc_eco));
        return items;
    }

    @NonNull
    static List<String> getDefaultSceneIds() {
        return Arrays.asList("home", "away", "movie", "sleep");
    }

    @NonNull
    static List<String> getEnabledSceneIds(@NonNull Context context) {
        String stored = GreeDeviceCatalog.getPrefs(context).getString(KEY_ENABLED_SCENE_IDS, null);
        List<String> defaults = getDefaultSceneIds();
        if (stored == null || stored.trim().isEmpty()) {
            return new ArrayList<>(defaults);
        }
        Set<String> validIds = new LinkedHashSet<>();
        for (SceneItem item : getAllScenes()) {
            validIds.add(item.id);
        }
        List<String> ids = new ArrayList<>();
        for (String part : stored.split(",")) {
            String id = part.trim();
            if (!id.isEmpty() && validIds.contains(id) && !ids.contains(id)) {
                ids.add(id);
            }
        }
        if (ids.isEmpty()) {
            return new ArrayList<>(defaults);
        }
        return ids;
    }

    static void setEnabledSceneIds(@NonNull Context context, @NonNull List<String> ids) {
        LinkedHashSet<String> deduped = new LinkedHashSet<>(ids);
        List<String> cleaned = new ArrayList<>();
        for (String id : deduped) {
            if (findById(id) != null) {
                cleaned.add(id);
            }
        }
        GreeDeviceCatalog.getPrefs(context).edit()
                .putString(KEY_ENABLED_SCENE_IDS, android.text.TextUtils.join(",", cleaned))
                .apply();
    }

    @NonNull
    static List<SceneItem> getEnabledScenes(@NonNull Context context) {
        List<String> enabledIds = getEnabledSceneIds(context);
        List<SceneItem> scenes = new ArrayList<>();
        for (String id : enabledIds) {
            SceneItem item = findById(id);
            if (item != null) {
                scenes.add(item);
            }
        }
        return scenes;
    }

    static SceneItem findById(String id) {
        for (SceneItem item : getAllScenes()) {
            if (item.id.equals(id)) {
                return item;
            }
        }
        return null;
    }
}
