package com.hive.gree;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

public class ProfileActivity extends AppCompatActivity {

    public static final String EXTRA_MEMBER_INDEX = "member_index";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setupTransparentStatusBar();
        setContentView(R.layout.activity_profile);

        ImageView avatar = findViewById(R.id.gree_profile_avatar);
        GreeImageClip.clipCircle(avatar);

        TextView homeView = findViewById(R.id.gree_profile_home);
        homeView.setText(getString(R.string.gree_profile_account_line2, GreeProfileData.HOME_NAME));

        bindKvRows();
        bindMembers();

        findViewById(R.id.gree_profile_back).setOnClickListener(v -> finish());
    }

    private void bindKvRows() {
        LinearLayout container = findViewById(R.id.gree_profile_kv_container);
        LayoutInflater inflater = LayoutInflater.from(this);
        int deviceCount = GreeDeviceCatalog.getAllFullDevices().size();
        String[][] rows = {
                {getString(R.string.gree_profile_level_label), getString(R.string.gree_profile_level_value)},
                {getString(R.string.gree_profile_devices_label),
                        getString(R.string.gree_profile_devices_value, deviceCount)},
                {getString(R.string.gree_profile_points_label), getString(R.string.gree_profile_points_value)},
                {getString(R.string.gree_profile_join_label), getString(R.string.gree_profile_join_value)},
        };
        for (int i = 0; i < rows.length; i++) {
            View row = inflater.inflate(R.layout.item_profile_kv_row, container, false);
            ((TextView) row.findViewById(R.id.profile_kv_label)).setText(rows[i][0]);
            ((TextView) row.findViewById(R.id.profile_kv_value)).setText(rows[i][1]);
            View divider = row.findViewById(R.id.profile_kv_divider);
            divider.setVisibility(i == rows.length - 1 ? View.GONE : View.VISIBLE);
            container.addView(row);
        }
    }

    private void bindMembers() {
        TextView familyTitle = findViewById(R.id.gree_profile_family_title);
        familyTitle.setText(getString(R.string.gree_profile_family_title, GreeProfileData.MEMBERS.length));

        LinearLayout list = findViewById(R.id.gree_profile_member_list);
        LayoutInflater inflater = LayoutInflater.from(this);
        int gap = dp(9);
        for (int i = 0; i < GreeProfileData.MEMBERS.length; i++) {
            GreeProfileData.Member member = GreeProfileData.MEMBERS[i];
            View item = inflater.inflate(R.layout.item_profile_member, list, false);
            ImageView avatar = item.findViewById(R.id.profile_member_avatar);
            avatar.setImageResource(member.avatarRes);
            GreeImageClip.clipCircle(avatar);
            ((TextView) item.findViewById(R.id.profile_member_name)).setText(member.nameRes);
            ((TextView) item.findViewById(R.id.profile_member_role)).setText(member.roleRes);
            ((TextView) item.findViewById(R.id.profile_member_desc)).setText(member.descRes);
            int index = i;
            item.setOnClickListener(v -> openMember(index));
            LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            if (i > 0) {
                lp.topMargin = gap;
            }
            list.addView(item, lp);
        }
    }

    private void openMember(int index) {
        startActivity(new Intent(this, ProfileMemberActivity.class)
                .putExtra(EXTRA_MEMBER_INDEX, index));
    }

    private void setupTransparentStatusBar() {
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        WindowInsetsControllerCompat controller =
                new WindowInsetsControllerCompat(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(true);
        getWindow().getDecorView().post(() -> {
            View root = findViewById(R.id.gree_profile_root);
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

    private int dp(int value) {
        return Math.round(TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP, value, getResources().getDisplayMetrics()));
    }
}
