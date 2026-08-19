package com.hive.gree;

import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

public class ProfileMemberActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setupTransparentStatusBar();
        setContentView(R.layout.activity_profile_member);

        int index = getIntent().getIntExtra(ProfileActivity.EXTRA_MEMBER_INDEX, 0);
        GreeProfileData.Member member = GreeProfileData.getMember(index);

        ((TextView) findViewById(R.id.gree_profile_member_title)).setText(member.nameRes);
        ((TextView) findViewById(R.id.gree_profile_member_extra)).setText(member.roleRes);

        ImageView avatar = findViewById(R.id.gree_profile_member_avatar);
        avatar.setImageResource(member.avatarRes);
        GreeImageClip.clipCircle(avatar);

        ((TextView) findViewById(R.id.gree_profile_member_name)).setText(member.nameRes);
        ((TextView) findViewById(R.id.gree_profile_member_desc)).setText(member.descRes);
        ((TextView) findViewById(R.id.gree_profile_member_age))
                .setText(getString(R.string.gree_profile_age_value, member.age));
        ((TextView) findViewById(R.id.gree_profile_member_height))
                .setText(getString(R.string.gree_profile_height_value, member.heightCm));
        ((TextView) findViewById(R.id.gree_profile_member_weight))
                .setText(getString(R.string.gree_profile_weight_value, member.weightKg));

        bindHealthRows(member);
        bindGeo(member, index);

        findViewById(R.id.gree_profile_member_back).setOnClickListener(v -> finish());
    }

    private void bindHealthRows(GreeProfileData.Member member) {
        int totalMin = member.sleepDeepMin + member.sleepLightMin + member.sleepRemMin;
        int hours = totalMin / 60;
        int minutes = totalMin % 60;
        GreeProfileData.SleepLevel sleepLevel = GreeProfileData.sleepLevel(member.sleepScore);
        String sleepQuality = getString(R.string.gree_profile_sleep_quality,
                getString(sleepLevel.labelRes));

        bindHealthRow(findViewById(R.id.gree_profile_sleep_row),
                R.drawable.ic_gree_profile_sleep, Color.parseColor("#EFEBFF"),
                getString(R.string.gree_profile_sleep_title),
                getString(R.string.gree_profile_sleep_desc, hours, minutes,
                        member.sleepStart, member.sleepEnd),
                sleepQuality, sleepLevel.color, 0x1A000000);

        bindHealthRow(findViewById(R.id.gree_profile_diet_row),
                R.drawable.ic_gree_profile_diet, Color.parseColor("#FDF3E3"),
                getString(R.string.gree_profile_diet_title),
                getString(member.dietRes),
                null, 0, 0);

        View waterRow = findViewById(R.id.gree_profile_water_row);
        bindHealthRow(waterRow,
                R.drawable.ic_gree_profile_water, Color.parseColor("#E8F6FB"),
                getString(R.string.gree_profile_water_title),
                getString(member.waterRes),
                getString(R.string.gree_profile_water_settings),
                Color.parseColor("#0090B0"), Color.parseColor("#E8F6FB"));
        waterRow.setOnClickListener(v -> Toast.makeText(this,
                R.string.gree_profile_water_toast, Toast.LENGTH_SHORT).show());
    }

    private void bindHealthRow(View row, int iconRes, int iconBgColor, String title, String desc,
            String badgeText, int badgeTextColor, int badgeBgColor) {
        View iconWrap = row.findViewById(R.id.profile_health_icon_wrap);
        GradientDrawable bg = new GradientDrawable();
        bg.setShape(GradientDrawable.RECTANGLE);
        bg.setCornerRadius(dp(12));
        bg.setColor(iconBgColor);
        iconWrap.setBackground(bg);

        ImageView icon = row.findViewById(R.id.profile_health_icon);
        icon.setImageResource(iconRes);

        ((TextView) row.findViewById(R.id.profile_health_title)).setText(title);
        ((TextView) row.findViewById(R.id.profile_health_desc)).setText(desc);

        TextView badge = row.findViewById(R.id.profile_health_badge);
        if (badgeText == null) {
            badge.setVisibility(View.GONE);
            return;
        }
        badge.setVisibility(View.VISIBLE);
        badge.setText(badgeText);
        badge.setTextColor(badgeTextColor);
        GradientDrawable badgeBg = new GradientDrawable();
        badgeBg.setShape(GradientDrawable.RECTANGLE);
        badgeBg.setCornerRadius(dp(10));
        badgeBg.setColor(badgeBgColor == 0 ? applyAlpha(badgeTextColor, 0.1f) : badgeBgColor);
        badge.setBackground(badgeBg);
    }

    private void bindGeo(GreeProfileData.Member member, int index) {
        ProfileGeoMapView map = findViewById(R.id.gree_profile_geo_map);
        map.setMemberIndex(index);

        ((TextView) findViewById(R.id.gree_profile_member_location)).setText(member.locationRes);

        TextView fenceBadge = findViewById(R.id.gree_profile_fence_badge);
        if (member.inFence) {
            fenceBadge.setText(R.string.gree_profile_fence_in);
            fenceBadge.setTextColor(Color.parseColor("#0D5C34"));
            applyBadgeBg(fenceBadge, Color.parseColor("#B9F2CF"));
        } else {
            fenceBadge.setText(R.string.gree_profile_fence_out);
            fenceBadge.setTextColor(Color.parseColor("#B26A00"));
            applyBadgeBg(fenceBadge, Color.parseColor("#FDF3E3"));
        }
    }

    private void applyBadgeBg(TextView badge, int color) {
        GradientDrawable bg = new GradientDrawable();
        bg.setShape(GradientDrawable.RECTANGLE);
        bg.setCornerRadius(dp(10));
        bg.setColor(color);
        badge.setBackground(bg);
    }

    private int applyAlpha(int color, float alpha) {
        int a = Math.round(255 * alpha);
        return (color & 0x00FFFFFF) | (a << 24);
    }

    private void setupTransparentStatusBar() {
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        WindowInsetsControllerCompat controller =
                new WindowInsetsControllerCompat(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(true);
        getWindow().getDecorView().post(() -> {
            View root = findViewById(R.id.gree_profile_member_root);
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

    private int dp(float value) {
        return Math.round(TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP, value, getResources().getDisplayMetrics()));
    }
}
