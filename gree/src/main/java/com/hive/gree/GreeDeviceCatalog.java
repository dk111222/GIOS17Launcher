package com.hive.gree;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.ColorRes;
import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;
import androidx.annotation.StringRes;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

final class GreeDeviceCatalog {

    static final String PREFS_NAME = "com.hive.gree.prefs";
    static final String KEY_SELECTED_DEVICE_IDS = "gree_plus_selected_device_ids";
    static final int MAX_VISIBLE_DEVICES = 4;
    static final String ROOM_ALL = "全屋";

    private static final String[] DEV_ORDER = {
            "ac", "fridge", "washer", "rice", "water", "purifier", "eheater",
            "fresh", "hood", "gas", "dish", "heater", "light", "oven", "dehum", "cam"
    };

    private static List<FullDevice> sFullDevices;

    private GreeDeviceCatalog() {
    }

    static final class DeviceItem {
        final String id;
        @StringRes final int titleRes;
        @StringRes final int roomRes;
        @StringRes final int valueRes;
        @StringRes final int subRes;
        @DrawableRes final int imageRes;
        final boolean running;
        final boolean showProgress;
        final boolean riceStyle;

        DeviceItem(String id, int titleRes, int roomRes, int valueRes, int subRes, int imageRes,
                boolean running, boolean showProgress, boolean riceStyle) {
            this.id = id;
            this.titleRes = titleRes;
            this.roomRes = roomRes;
            this.valueRes = valueRes;
            this.subRes = subRes;
            this.imageRes = imageRes;
            this.running = running;
            this.showProgress = showProgress;
            this.riceStyle = riceStyle;
        }
    }

    static final class RoomInfo {
        final String name;
        final boolean occupied;

        RoomInfo(String name, boolean occupied) {
            this.name = name;
            this.occupied = occupied;
        }
    }

    static final class AirQuality {
        final float temperature;
        final int humidity;
        final String aqi;

        AirQuality(float temperature, int humidity, String aqi) {
            this.temperature = temperature;
            this.humidity = humidity;
            this.aqi = aqi;
        }
    }

    static final class FullDevice {
        final String id;
        final String name;
        final String room;
        final String type;
        final boolean defaultOn;
        final String statusOn;
        final String statusOff;

        FullDevice(String id, String name, String room, String type, boolean defaultOn,
                String statusOn, String statusOff) {
            this.id = id;
            this.name = name;
            this.room = room;
            this.type = type;
            this.defaultOn = defaultOn;
            this.statusOn = statusOn;
            this.statusOff = statusOff;
        }

        String getStatus(boolean on) {
            return on ? statusOn : statusOff;
        }
    }

    @NonNull
    static SharedPreferences getPrefs(Context context) {
        return context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    @NonNull
    static List<DeviceItem> getAllDevices() {
        List<DeviceItem> items = new ArrayList<>();
        items.add(new DeviceItem("ac", R.string.gree_plus_ac_title, R.string.gree_plus_ac_room,
                R.string.gree_plus_ac_value, R.string.gree_plus_ac_sub, R.drawable.lw_ac,
                true, false, false));
        items.add(new DeviceItem("fridge", R.string.gree_plus_fridge_title, R.string.gree_plus_fridge_room,
                R.string.gree_plus_fridge_value, R.string.gree_plus_fridge_sub, R.drawable.lw_fridge,
                true, false, false));
        items.add(new DeviceItem("washer", R.string.gree_plus_washer_title, R.string.gree_plus_washer_room,
                0, R.string.gree_plus_washer_sub, R.drawable.washer_new,
                true, true, false));
        items.add(new DeviceItem("rice", R.string.gree_plus_rice_title, R.string.gree_plus_rice_room,
                0, R.string.gree_plus_rice_sub, R.drawable.lw_rice,
                true, true, true));
        items.add(new DeviceItem("dehum", R.string.gree_plus_dehum_title, R.string.gree_plus_dehum_room,
                R.string.gree_plus_dehum_value, R.string.gree_plus_dehum_sub, R.drawable.lw_dehum,
                false, false, false));
        items.add(new DeviceItem("water", R.string.gree_plus_water_title, R.string.gree_plus_water_room,
                R.string.gree_plus_water_value, R.string.gree_plus_water_sub, R.drawable.m_filter,
                false, false, false));
        return items;
    }

    @NonNull
    static List<String> getDefaultDeviceIds() {
        List<String> ids = new ArrayList<>();
        ids.add("ac");
        ids.add("fridge");
        ids.add("washer");
        ids.add("rice");
        return ids;
    }

    @NonNull
    static List<String> getSelectedDeviceIds(Context context) {
        String stored = getPrefs(context).getString(KEY_SELECTED_DEVICE_IDS, null);
        List<String> defaults = getDefaultDeviceIds();
        if (stored == null || stored.trim().isEmpty()) {
            return defaults;
        }
        Set<String> validIds = new LinkedHashSet<>();
        for (DeviceItem item : getAllDevices()) {
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
            return defaults;
        }
        return ids;
    }

    static void setSelectedDeviceIds(Context context, List<String> ids) {
        LinkedHashSet<String> deduped = new LinkedHashSet<>(ids);
        List<String> cleaned = new ArrayList<>();
        for (String id : deduped) {
            if (findById(id) != null) {
                cleaned.add(id);
            }
        }
        getPrefs(context).edit().putString(KEY_SELECTED_DEVICE_IDS, android.text.TextUtils.join(",", cleaned)).apply();
    }

    @NonNull
    static List<DeviceItem> getVisibleDevices(Context context) {
        List<String> selected = new ArrayList<>(getSelectedDeviceIds(context));
        for (String fallback : getDefaultDeviceIds()) {
            if (!selected.contains(fallback)) {
                selected.add(fallback);
            }
        }
        for (DeviceItem item : getAllDevices()) {
            if (!selected.contains(item.id)) {
                selected.add(item.id);
            }
        }
        List<DeviceItem> items = new ArrayList<>();
        for (String id : selected) {
            DeviceItem item = findById(id);
            if (item != null) {
                items.add(item);
            }
            if (items.size() >= MAX_VISIBLE_DEVICES) {
                break;
            }
        }
        return items;
    }

    static int getRunningCount(List<DeviceItem> items) {
        int count = 0;
        for (DeviceItem item : items) {
            if (item.running) {
                count++;
            }
        }
        return count;
    }

    static DeviceItem findById(String id) {
        for (DeviceItem item : getAllDevices()) {
            if (item.id.equals(id)) {
                return item;
            }
        }
        return null;
    }

    @NonNull
    static List<RoomInfo> getRoomInfos() {
        List<RoomInfo> rooms = new ArrayList<>();
        rooms.add(new RoomInfo("客厅", true));
        rooms.add(new RoomInfo("主卧", false));
        rooms.add(new RoomInfo("儿童房", true));
        rooms.add(new RoomInfo("厨房", true));
        rooms.add(new RoomInfo("书房", false));
        rooms.add(new RoomInfo("阳台", false));
        rooms.add(new RoomInfo("餐厅", false));
        rooms.add(new RoomInfo("卫生间", false));
        return rooms;
    }

    @NonNull
    static List<String> getSwitcherRooms() {
        List<String> rooms = new ArrayList<>();
        rooms.add(ROOM_ALL);
        for (RoomInfo room : getRoomInfos()) {
            if (countDevicesInRoom(room.name) > 0) {
                rooms.add(room.name);
            }
        }
        return rooms;
    }

    static RoomInfo findRoomInfo(String roomName) {
        for (RoomInfo room : getRoomInfos()) {
            if (room.name.equals(roomName)) {
                return room;
            }
        }
        return null;
    }

    @NonNull
    static AirQuality getAirForRoom(String room) {
        switch (room) {
            case "客厅":
                return new AirQuality(27.2f, 66, "优");
            case "主卧":
                return new AirQuality(27.8f, 70, "优");
            case "儿童房":
                return new AirQuality(27.0f, 65, "优");
            case "厨房":
                return new AirQuality(29.4f, 72, "良");
            case "书房":
                return new AirQuality(27.6f, 64, "优");
            case "阳台":
                return new AirQuality(30.2f, 75, "良");
            case "卫生间":
                return new AirQuality(28.1f, 78, "优");
            case "餐厅":
                return new AirQuality(27.4f, 67, "优");
            case ROOM_ALL:
            default:
                return new AirQuality(27.5f, 68, "优");
        }
    }

    @NonNull
    static List<FullDevice> getAllFullDevices() {
        if (sFullDevices == null) {
            sFullDevices = buildFullDevices();
        }
        return sFullDevices;
    }

    @NonNull
    static List<FullDevice> getSortedDevicesForRoom(String room) {
        List<FullDevice> devices = new ArrayList<>();
        for (FullDevice device : getAllFullDevices()) {
            if (ROOM_ALL.equals(room) || device.room.equals(room)) {
                devices.add(device);
            }
        }
        sortDevices(devices);
        return devices;
    }

    static int countDevicesInRoom(String room) {
        if (ROOM_ALL.equals(room)) {
            return getAllFullDevices().size();
        }
        int count = 0;
        for (FullDevice device : getAllFullDevices()) {
            if (device.room.equals(room)) {
                count++;
            }
        }
        return count;
    }

    static int countRunningInRoom(String room, java.util.Map<String, Boolean> powerStates) {
        int count = 0;
        for (FullDevice device : getSortedDevicesForRoom(room)) {
            Boolean on = powerStates.get(device.id);
            if (on != null && on) {
                count++;
            } else if (on == null && device.defaultOn) {
                count++;
            }
        }
        return count;
    }

    @ColorRes
    static int getTypeColorRes(String type) {
        switch (type) {
            case "ac":
                return R.color.gree_type_ac;
            case "light":
                return R.color.gree_type_light;
            case "fridge":
                return R.color.gree_type_fridge;
            case "washer":
                return R.color.gree_type_washer;
            case "oven":
                return R.color.gree_type_oven;
            case "rice":
                return R.color.gree_type_rice;
            case "gas":
                return R.color.gree_type_gas;
            case "hood":
                return R.color.gree_type_hood;
            case "dish":
                return R.color.gree_type_dish;
            case "water":
                return R.color.gree_type_water;
            case "dehum":
                return R.color.gree_type_dehum;
            case "eheater":
                return R.color.gree_type_eheater;
            case "fresh":
                return R.color.gree_type_fresh;
            case "purifier":
                return R.color.gree_type_purifier;
            case "cam":
                return R.color.gree_type_cam;
            case "heater":
                return R.color.gree_type_heater;
            default:
                return R.color.gree_neo_ink2;
        }
    }

    @DrawableRes
    static int getTypeIconRes(String type) {
        switch (type) {
            case "ac":
                return R.drawable.ic_gree_plus_air;
            case "light":
                return R.drawable.ic_gree_plus_cloud;
            case "water":
            case "dehum":
                return R.drawable.ic_gree_plus_drop;
            case "fresh":
            case "purifier":
                return R.drawable.ic_gree_plus_leaf;
            case "heater":
            case "eheater":
                return R.drawable.ic_gree_plus_temp;
            default:
                return R.drawable.ic_gree_plus_agg;
        }
    }

    private static void sortDevices(List<FullDevice> devices) {
        devices.sort((a, b) -> {
            int ia = indexOfType(a.type);
            int ib = indexOfType(b.type);
            if (ia != ib) {
                return ia - ib;
            }
            return a.name.compareTo(b.name);
        });
    }

    private static int indexOfType(String type) {
        for (int i = 0; i < DEV_ORDER.length; i++) {
            if (DEV_ORDER[i].equals(type)) {
                return i;
            }
        }
        return 99;
    }

    @NonNull
    private static List<FullDevice> buildFullDevices() {
        List<FullDevice> devices = new ArrayList<>();
        devices.add(new FullDevice("ac1", "客厅空调", "客厅", "ac", true, "制冷 · 26°C", "已关闭"));
        devices.add(new FullDevice("ac2", "主卧空调", "主卧", "ac", false, "制冷 · 26°C", "已关闭"));
        devices.add(new FullDevice("ac3", "儿童房空调", "儿童房", "ac", true, "制冷 · 27°C", "已关闭"));
        devices.add(new FullDevice("ac4", "书房空调", "书房", "ac", false, "制冷 · 26°C", "已关闭"));
        devices.add(new FullDevice("lt1", "客厅主灯", "客厅", "light", true, "亮度 80%", "已关闭"));
        devices.add(new FullDevice("lt2", "客厅氛围灯", "客厅", "light", false, "亮度 60%", "已关闭"));
        devices.add(new FullDevice("lt3", "主卧吸顶灯", "主卧", "light", false, "亮度 70%", "已关闭"));
        devices.add(new FullDevice("lt4", "厨房灯", "厨房", "light", true, "亮度 90%", "已关闭"));
        devices.add(new FullDevice("lt5", "儿童房灯", "儿童房", "light", true, "亮度 75%", "已关闭"));
        devices.add(new FullDevice("lt6", "阳台灯", "阳台", "light", false, "亮度 50%", "已关闭"));
        devices.add(new FullDevice("lt7", "餐厅吊灯", "餐厅", "light", false, "亮度 70%", "已关闭"));
        devices.add(new FullDevice("fr1", "厨房冰箱", "厨房", "fridge", true, "冷藏 5° · 冷冻 -18°", "冷藏 5° · 冷冻 -18°"));
        devices.add(new FullDevice("wm1", "阳台洗衣机", "阳台", "washer", true, "混合洗 · 剩余 28:00", "已暂停"));
        devices.add(new FullDevice("ov1", "厨房蒸烤箱", "厨房", "oven", true, "蒸鲈鱼 · 剩余 05:00", "待机"));
        devices.add(new FullDevice("rc1", "厨房电饭煲", "厨房", "rice", false, "柴火饭 · 剩余 35:00", "米已洗好，等待开始"));
        devices.add(new FullDevice("gs1", "厨房燃气灶", "厨房", "gas", false, "运行中", "已关闭"));
        devices.add(new FullDevice("hd1", "厨房油烟机", "厨房", "hood", true, "2 档运行", "已关闭"));
        devices.add(new FullDevice("dw1", "厨房洗碗机", "厨房", "dish", false, "运行中", "已关闭"));
        devices.add(new FullDevice("wp1", "厨房净水器", "厨房", "water", true, "净水中", "已关闭"));
        devices.add(new FullDevice("dh1", "主卧除湿机", "主卧", "dehum", false, "智能 · 55%", "已关闭"));
        devices.add(new FullDevice("eh1", "主卧电暖器", "主卧", "eheater", true, "静热 · 28°C", "已关闭"));
        devices.add(new FullDevice("fa1", "客厅新风机", "客厅", "fresh", true, "PM2.5 16 · 优", "已关闭"));
        devices.add(new FullDevice("pf1", "客厅空气净化器", "客厅", "purifier", true, "自动模式", "已关闭"));
        devices.add(new FullDevice("cm1", "客厅摄像头", "客厅", "cam", true, "实时监控", "已关闭"));
        devices.add(new FullDevice("wh1", "卫生间热水器", "卫生间", "heater", true, "45°C 保温中", "已关闭"));
        return devices;
    }
}
