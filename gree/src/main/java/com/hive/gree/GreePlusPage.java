package com.hive.gree;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.Looper;
import android.util.AttributeSet;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import java.util.List;
import java.util.Calendar;
import java.util.Locale;

/** Innovation-layout desktop page (neo-desk2) hosted by the gree module. */
public class GreePlusPage extends FrameLayout {

    private static final long TICK_MS = 1000L;
    private static final long MALL_INTERVAL_MS = 4200L;
    private static final int WASHER_TOTAL_SEC = 28 * 60;
    private static final int RICE_TOTAL_SEC = 35 * 60;
    private static final String[] WEEKDAYS = {"周日", "周一", "周二", "周三", "周四", "周五", "周六"};

    private final Handler handler = new Handler(Looper.getMainLooper());
    private TextView timeView;
    private TextView dateView;
    private TextView sectionRunningView;
    private TextView washerValue;
    private TextView riceValue;
    private View washerFill;
    private View riceFill;
    private ViewPager2 mallPager;
    private LinearLayout mallDots;
    private SharedPreferences prefs;
    private int mallIndex;
    private int washerLeft = WASHER_TOTAL_SEC;
    private int riceLeft = RICE_TOTAL_SEC;
    private final SharedPreferences.OnSharedPreferenceChangeListener prefsListener = (sharedPreferences, key) -> {
        if (GreeDeviceCatalog.KEY_SELECTED_DEVICE_IDS.equals(key)) {
            bindDevices();
        }
    };

    private final Runnable tickRunnable = new Runnable() {
        @Override
        public void run() {
            updateClock();
            if (washerLeft > 0) {
                washerLeft--;
            }
            if (riceLeft > 0) {
                riceLeft--;
            }
            bindCountdowns();
            handler.postDelayed(this, TICK_MS);
        }
    };

    private final Runnable mallRunnable = new Runnable() {
        @Override
        public void run() {
            if (mallPager == null || mallPager.getAdapter() == null) {
                return;
            }
            int count = mallPager.getAdapter().getItemCount();
            if (count <= 1) {
                return;
            }
            mallIndex = (mallIndex + 1) % count;
            mallPager.setCurrentItem(mallIndex, true);
            handler.postDelayed(this, MALL_INTERVAL_MS);
        }
    };

    public GreePlusPage(@NonNull Context context) {
        super(context);
        init(context);
    }

    public GreePlusPage(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public GreePlusPage(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        if (prefs != null) {
            prefs.registerOnSharedPreferenceChangeListener(prefsListener);
        }
        handler.removeCallbacks(tickRunnable);
        handler.removeCallbacks(mallRunnable);
        bindDevices();
        handler.post(tickRunnable);
        handler.postDelayed(mallRunnable, MALL_INTERVAL_MS);
    }

    @Override
    protected void onDetachedFromWindow() {
        if (prefs != null) {
            prefs.unregisterOnSharedPreferenceChangeListener(prefsListener);
        }
        handler.removeCallbacks(tickRunnable);
        handler.removeCallbacks(mallRunnable);
        super.onDetachedFromWindow();
    }

    private void init(Context context) {
        LayoutInflater.from(context).inflate(R.layout.gree_plus_page, this, true);
        setClickable(true);
        setFocusable(true);
        prefs = GreeDeviceCatalog.getPrefs(context);
        timeView = findViewById(R.id.gree_plus_time);
        dateView = findViewById(R.id.gree_plus_date);
        sectionRunningView = findViewById(R.id.gree_plus_section_running);
        bindHome();
        bindDevices();
        bindMall();
        bindTonight();
        updateClock();
        bindCountdowns();
    }

    public void setHotseatClearance(int pixels) {
        View scroll = findViewById(R.id.gree_plus_scroll);
        if (scroll == null || pixels < 0 || scroll.getPaddingBottom() == pixels) {
            return;
        }
        scroll.setPadding(scroll.getPaddingLeft(), scroll.getPaddingTop(),
                scroll.getPaddingRight(), pixels);
    }

    private void bindHome() {
        View home = findViewById(R.id.gree_plus_home);
        GreeImageClip.clipRound(home, getResources().getDimension(R.dimen.gree_plus_env_radius));
        home.setOnClickListener(v -> toast("我的家概况"));
        findViewById(R.id.gree_plus_all_spaces).setOnClickListener(v -> toast("全部空间"));
        findViewById(R.id.gree_plus_all_devices).setOnClickListener(
                v -> getContext().startActivity(new Intent(getContext(), GreeAllDevicesActivity.class)));
    }

    private void bindDevices() {
        int[] cardIds = {R.id.gree_plus_ac_card, R.id.gree_plus_fridge_card,
                R.id.gree_plus_washer_card, R.id.gree_plus_rice_card};
        List<GreeDeviceCatalog.DeviceItem> devices = GreeDeviceCatalog.getVisibleDevices(getContext());
        for (int i = 0; i < cardIds.length; i++) {
            View card = findViewById(cardIds[i]);
            if (i < devices.size()) {
                bindDevice(card, devices.get(i));
                card.setVisibility(VISIBLE);
            } else {
                card.setVisibility(INVISIBLE);
            }
        }
        if (sectionRunningView != null) {
            sectionRunningView.setText(GreeDeviceCatalog.getRunningCount(devices) + " 台运行中");
        }
        bindCountdownViews();
        bindCountdowns();
    }

    private void bindDevice(View card, GreeDeviceCatalog.DeviceItem item) {
        TextView title = card.findViewById(R.id.dev_title);
        TextView room = card.findViewById(R.id.dev_room);
        TextView value = card.findViewById(R.id.dev_value);
        TextView sub = card.findViewById(R.id.dev_sub);
        title.setText(item.titleRes);
        room.setText(item.roomRes);
        String valueText = item.showProgress
                ? getContext().getString(item.id.equals("washer") ? R.string.gree_plus_washer_demo_value
                : R.string.gree_plus_rice_demo_value)
                : getContext().getString(item.valueRes);
        value.setText(valueText);
        sub.setText(item.subRes);
        ImageView image = card.findViewById(R.id.dev_image);
        image.setImageResource(item.imageRes);
        image.setScaleType(ImageView.ScaleType.FIT_END);
        image.setAdjustViewBounds(true);
        View bar = card.findViewById(R.id.dev_bar);
        bar.setVisibility(item.showProgress ? VISIBLE : GONE);
        if (item.riceStyle) {
            card.findViewById(R.id.dev_bar_fill).setBackgroundResource(R.drawable.gree_plus_bar_rice);
        } else {
            card.findViewById(R.id.dev_bar_fill).setBackgroundResource(R.drawable.gree_plus_bar_wash);
        }
        card.post(() -> applyDeviceCardLayout(card, item.showProgress));
        card.setOnClickListener(v -> toast(getContext().getString(item.titleRes)));
        GreeImageClip.clipRound(card, getResources().getDimension(R.dimen.gree_plus_dev_radius));
    }

    private void applyDeviceCardLayout(View card, boolean showProgress) {
        int cardWidth = card.getWidth();
        int cardHeight = card.getHeight();
        if (cardWidth <= 0 || cardHeight <= 0) {
            return;
        }
        ImageView image = card.findViewById(R.id.dev_image);
        int maxImageWidth = cardWidth / 4;
        int topMargin = getResources().getDimensionPixelSize(R.dimen.gree_plus_dev_image_margin_top);
        int bottomMargin = getResources().getDimensionPixelSize(R.dimen.gree_plus_dev_image_margin_bottom);
        int maxImageHeight = Math.max(0, cardHeight - topMargin - bottomMargin);
        image.setMaxWidth(maxImageWidth);
        image.setMaxHeight(maxImageHeight);
        android.widget.FrameLayout.LayoutParams imageLp =
                (android.widget.FrameLayout.LayoutParams) image.getLayoutParams();
        imageLp.width = android.widget.FrameLayout.LayoutParams.WRAP_CONTENT;
        imageLp.height = android.widget.FrameLayout.LayoutParams.WRAP_CONTENT;
        imageLp.gravity = Gravity.TOP | Gravity.END;
        imageLp.setMargins(0, topMargin, dp(4), 0);
        image.setLayoutParams(imageLp);

        View content = card.findViewById(R.id.gree_plus_dev_content);
        if (content != null) {
            int padEnd = maxImageWidth + dp(8);
            content.setPadding(content.getPaddingLeft(), content.getPaddingTop(), padEnd,
                    content.getPaddingBottom());
        }

        if (showProgress) {
            View bar = card.findViewById(R.id.dev_bar);
            int barWidth = cardWidth / 2;
            android.widget.FrameLayout.LayoutParams barLp =
                    (android.widget.FrameLayout.LayoutParams) bar.getLayoutParams();
            barLp.width = barWidth;
            barLp.leftMargin = dp(12);
            barLp.rightMargin = 0;
            bar.setLayoutParams(barLp);
        }
    }

    private void bindCountdownViews() {
        washerValue = null;
        washerFill = null;
        riceValue = null;
        riceFill = null;
        int[] cardIds = {R.id.gree_plus_ac_card, R.id.gree_plus_fridge_card,
                R.id.gree_plus_washer_card, R.id.gree_plus_rice_card};
        for (int cardId : cardIds) {
            View card = findViewById(cardId);
            if (card.getVisibility() != VISIBLE) {
                continue;
            }
            TextView title = card.findViewById(R.id.dev_title);
            if (title == null || title.getText() == null) {
                continue;
            }
            String text = title.getText().toString();
            if (getContext().getString(R.string.gree_plus_washer_title).equals(text)) {
                washerValue = card.findViewById(R.id.dev_value);
                washerFill = card.findViewById(R.id.dev_bar_fill);
            } else if (getContext().getString(R.string.gree_plus_rice_title).equals(text)) {
                riceValue = card.findViewById(R.id.dev_value);
                riceFill = card.findViewById(R.id.dev_bar_fill);
            }
        }
    }

    private void bindMall() {
        mallPager = findViewById(R.id.gree_plus_mall_pager);
        mallDots = findViewById(R.id.gree_plus_mall_dots);
        MallItem[] items = {
                new MallItem(R.drawable.m_filter, R.string.gree_plus_mall_1_title, R.string.gree_plus_mall_1_desc),
                new MallItem(R.drawable.m_dehum, R.string.gree_plus_mall_2_title, R.string.gree_plus_mall_2_desc),
                new MallItem(R.drawable.m_ac, R.string.gree_plus_mall_3_title, R.string.gree_plus_mall_3_desc),
        };
        mallPager.setAdapter(new MallAdapter(items));
        mallPager.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageSelected(int position) {
                mallIndex = position;
                updateMallDots(position);
            }
        });
        buildMallDots(items.length);
        findViewById(R.id.gree_plus_mall).setOnClickListener(v -> toast("商城服务"));
        GreeImageClip.clipRound(findViewById(R.id.gree_plus_mall),
                getResources().getDimension(R.dimen.gree_plus_duo_radius));
    }

    private void bindTonight() {
        View tonight = findViewById(R.id.gree_plus_tonight);
        GreeImageClip.clipRound(tonight, getResources().getDimension(R.dimen.gree_plus_duo_radius));
        tonight.setOnClickListener(v -> toast("今晚 · 家的安排"));
    }

    private void buildMallDots(int count) {
        mallDots.removeAllViews();
        int gap = dp(4);
        for (int i = 0; i < count; i++) {
            View dot = new View(getContext());
            LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(dp(i == 0 ? 11 : 4), dp(4));
            if (i > 0) {
                lp.setMarginStart(gap);
            }
            dot.setLayoutParams(lp);
            dot.setBackgroundResource(i == 0 ? R.drawable.gree_banner_dot_on : R.drawable.gree_plus_mall_dot_off);
            mallDots.addView(dot);
        }
    }

    private void updateMallDots(int selected) {
        for (int i = 0; i < mallDots.getChildCount(); i++) {
            View dot = mallDots.getChildAt(i);
            ViewGroup.LayoutParams lp = dot.getLayoutParams();
            lp.width = dp(i == selected ? 11 : 4);
            dot.setLayoutParams(lp);
            dot.setBackgroundResource(i == selected ? R.drawable.gree_banner_dot_on
                    : R.drawable.gree_plus_mall_dot_off);
        }
    }

    private void updateClock() {
        Calendar calendar = Calendar.getInstance();
        timeView.setText(String.format(Locale.CHINA, "%02d:%02d",
                calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE)));
        int weekIndex = calendar.get(Calendar.DAY_OF_WEEK) - 1;
        dateView.setText(String.format(Locale.CHINA, "%d月%d日 %s",
                calendar.get(Calendar.MONTH) + 1,
                calendar.get(Calendar.DAY_OF_MONTH),
                WEEKDAYS[weekIndex]));
    }

    private void bindCountdowns() {
        if (washerValue != null) {
            washerValue.setText(formatRemain(washerLeft));
            setBarFraction(washerFill, washerLeft / (float) WASHER_TOTAL_SEC);
        }
        if (riceValue != null) {
            riceValue.setText(formatRemain(riceLeft));
            setBarFraction(riceFill, riceLeft / (float) RICE_TOTAL_SEC);
        }
    }

    private void setBarFraction(View fill, float fraction) {
        if (fill == null) {
            return;
        }
        View parent = (View) fill.getParent();
        parent.post(() -> {
            int width = Math.max(0, Math.round(parent.getWidth() * Math.max(0f, Math.min(1f, fraction))));
            ViewGroup.LayoutParams lp = fill.getLayoutParams();
            lp.width = width;
            fill.setLayoutParams(lp);
        });
    }

    private String formatRemain(int seconds) {
        int safe = Math.max(0, seconds);
        return String.format(Locale.CHINA, "%02d:%02d", safe / 60, safe % 60);
    }

    private void toast(String message) {
        Toast.makeText(getContext(),
                getContext().getString(R.string.gree_toast_demo, message),
                Toast.LENGTH_SHORT).show();
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private static final class MallItem {
        final int imageRes;
        final int titleRes;
        final int descRes;

        MallItem(int imageRes, int titleRes, int descRes) {
            this.imageRes = imageRes;
            this.titleRes = titleRes;
            this.descRes = descRes;
        }
    }

    private final class MallAdapter extends RecyclerView.Adapter<MallAdapter.Holder> {
        private final MallItem[] items;

        MallAdapter(MallItem[] items) {
            this.items = items;
        }

        @NonNull
        @Override
        public Holder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.item_gree_plus_mall, parent, false);
            view.setLayoutParams(new ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT));
            return new Holder(view);
        }

        @Override
        public void onBindViewHolder(@NonNull Holder holder, int position) {
            MallItem item = items[position];
            holder.image.setImageResource(item.imageRes);
            GreeImageClip.clipRound(holder.image, dp(12));
            holder.title.setText(item.titleRes);
            holder.desc.setText(item.descRes);
            holder.itemView.setOnClickListener(v -> toast(holder.title.getText().toString()));
        }

        @Override
        public int getItemCount() {
            return items.length;
        }

        final class Holder extends RecyclerView.ViewHolder {
            final ImageView image;
            final TextView title;
            final TextView desc;

            Holder(@NonNull View itemView) {
                super(itemView);
                image = itemView.findViewById(R.id.mall_image);
                title = itemView.findViewById(R.id.mall_title);
                desc = itemView.findViewById(R.id.mall_desc);
            }
        }
    }
}
