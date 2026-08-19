package com.hive.gree;

import androidx.annotation.ColorInt;
import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;
import androidx.annotation.StringRes;

final class GreeProfileData {

    static final String HOME_NAME = "明珠花园 3 栋 1201";

    private GreeProfileData() {
    }

    static final class Member {
        @DrawableRes final int avatarRes;
        @StringRes final int nameRes;
        @StringRes final int roleRes;
        @StringRes final int descRes;
        final int age;
        final int heightCm;
        final int weightKg;
        @StringRes final int locationRes;
        final boolean inFence;
        @StringRes final int dietRes;
        @StringRes final int waterRes;
        final int sleepScore;
        final int sleepDeepMin;
        final int sleepLightMin;
        final int sleepRemMin;
        final String sleepStart;
        final String sleepEnd;

        Member(int avatarRes, int nameRes, int roleRes, int descRes, int age, int heightCm, int weightKg,
                int locationRes, boolean inFence, int dietRes, int waterRes,
                int sleepScore, int sleepDeepMin, int sleepLightMin, int sleepRemMin,
                String sleepStart, String sleepEnd) {
            this.avatarRes = avatarRes;
            this.nameRes = nameRes;
            this.roleRes = roleRes;
            this.descRes = descRes;
            this.age = age;
            this.heightCm = heightCm;
            this.weightKg = weightKg;
            this.locationRes = locationRes;
            this.inFence = inFence;
            this.dietRes = dietRes;
            this.waterRes = waterRes;
            this.sleepScore = sleepScore;
            this.sleepDeepMin = sleepDeepMin;
            this.sleepLightMin = sleepLightMin;
            this.sleepRemMin = sleepRemMin;
            this.sleepStart = sleepStart;
            this.sleepEnd = sleepEnd;
        }
    }

    static final Member[] MEMBERS = {
            new Member(R.drawable.a_dad, R.string.gree_profile_name_dad, R.string.gree_profile_role_dad,
                    R.string.gree_profile_desc_dad, 38, 176, 72, R.string.gree_profile_loc_dad, true,
                    R.string.gree_profile_diet_dad, R.string.gree_profile_water_dad,
                    74, 112, 196, 82, "23:52", "06:34"),
            new Member(R.drawable.a_mom, R.string.gree_profile_name_mom, R.string.gree_profile_role_mom,
                    R.string.gree_profile_desc_mom, 36, 163, 52, R.string.gree_profile_loc_mom, false,
                    R.string.gree_profile_diet_mom, R.string.gree_profile_water_mom,
                    85, 138, 208, 94, "23:21", "06:41"),
            new Member(R.drawable.a_grandpa, R.string.gree_profile_name_grandpa, R.string.gree_profile_role_grandpa,
                    R.string.gree_profile_desc_grandpa, 65, 170, 68, R.string.gree_profile_loc_grandpa, true,
                    R.string.gree_profile_diet_grandpa, R.string.gree_profile_water_grandpa,
                    68, 96, 226, 62, "22:48", "05:52"),
            new Member(R.drawable.a_girl, R.string.gree_profile_name_girl, R.string.gree_profile_role_girl,
                    R.string.gree_profile_desc_girl, 7, 126, 26, R.string.gree_profile_loc_girl, true,
                    R.string.gree_profile_diet_girl, R.string.gree_profile_water_girl,
                    91, 152, 234, 106, "21:32", "06:58"),
    };

    @NonNull
    static Member getMember(int index) {
        if (index < 0 || index >= MEMBERS.length) {
            return MEMBERS[0];
        }
        return MEMBERS[index];
    }

    @NonNull
    static SleepLevel sleepLevel(int score) {
        if (score >= 90) {
            return new SleepLevel(R.string.gree_profile_sleep_excellent, 0xFF34A853);
        }
        if (score >= 80) {
            return new SleepLevel(R.string.gree_profile_sleep_good, 0xFF1A73E8);
        }
        if (score >= 70) {
            return new SleepLevel(R.string.gree_profile_sleep_fair, 0xFFF29900);
        }
        return new SleepLevel(R.string.gree_profile_sleep_poor, 0xFFE54545);
    }

    static final class SleepLevel {
        @StringRes final int labelRes;
        @ColorInt final int color;

        SleepLevel(int labelRes, int color) {
            this.labelRes = labelRes;
            this.color = color;
        }
    }
}
