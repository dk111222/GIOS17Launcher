package com.hive.gree;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.provider.CalendarContract;
import android.util.AttributeSet;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

/** Innovation-layout minus-one screen hosted by the gree module. */
public class GreeLivePage extends FrameLayout {

    private static final long BANNER_INTERVAL_MS = 3600L;

    private final Handler bannerHandler = new Handler(Looper.getMainLooper());
    private ViewPager2 bannerPager;
    private LinearLayout bannerDots;
    private int bannerIndex;

    private final Runnable bannerRunnable = new Runnable() {
        @Override
        public void run() {
            if (bannerPager == null || bannerPager.getAdapter() == null) {
                return;
            }
            int count = bannerPager.getAdapter().getItemCount();
            if (count <= 1) {
                return;
            }
            bannerIndex = (bannerIndex + 1) % count;
            bannerPager.setCurrentItem(bannerIndex, true);
            bannerHandler.postDelayed(this, BANNER_INTERVAL_MS);
        }
    };

    public GreeLivePage(@NonNull Context context) {
        super(context);
        init(context);
    }

    public GreeLivePage(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public GreeLivePage(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        bannerHandler.postDelayed(bannerRunnable, BANNER_INTERVAL_MS);
    }

    @Override
    protected void onDetachedFromWindow() {
        bannerHandler.removeCallbacks(bannerRunnable);
        super.onDetachedFromWindow();
    }

    private void init(Context context) {
        LayoutInflater.from(context).inflate(R.layout.gree_live_page, this, true);
        setClickable(true);
        setFocusable(true);
        bindTopBar();
        bindScenes();
        bindBanner();
        bindGreeServices();
        bindPhoneServices();
        GreeImageClip.clipCircle(findViewById(R.id.gree_avatar_wrap));
        GreeImageClip.clipCircle(findViewById(R.id.gree_avatar_btn));
    }

    private void bindTopBar() {
        EditText searchInput = getSearchInput();
        findViewById(R.id.gree_search_bar).setOnClickListener(v -> focusSearchInput());
        searchInput.setOnTouchListener((v, event) -> {
            if (event.getAction() == MotionEvent.ACTION_DOWN) {
                ViewParent parent = v.getParent();
                while (parent != null) {
                    parent.requestDisallowInterceptTouchEvent(true);
                    parent = parent.getParent();
                }
            }
            return false;
        });
        findViewById(R.id.gree_avatar_btn).setOnClickListener(v ->
                getContext().startActivity(new Intent(getContext(), ProfileActivity.class)));
        findViewById(R.id.gree_avatar_wrap).setOnClickListener(v ->
                getContext().startActivity(new Intent(getContext(), ProfileActivity.class)));
        findViewById(R.id.gree_all_devices_btn).setOnClickListener(
                v -> getContext().startActivity(new Intent(getContext(), GreeAllDevicesActivity.class)));
        findViewById(R.id.gree_scene_settings_btn).setOnClickListener(
                v -> GreeSceneSettingsDialog.show(getContext(), this::refreshScenes));
    }

    public EditText getSearchInput() {
        return findViewById(R.id.gree_search_input);
    }

    public ImageView getSearchClear() {
        return findViewById(R.id.gree_search_clear);
    }

    public void setOnScanClickListener(OnClickListener listener) {
        findViewById(R.id.gree_scan_btn).setOnClickListener(listener);
    }

    public void focusSearchInput() {
        EditText input = getSearchInput();
        if (input == null) {
            return;
        }
        input.requestFocus();
        InputMethodManager imm = (InputMethodManager) getContext().getSystemService(Context.INPUT_METHOD_SERVICE);
        if (imm != null) {
            imm.showSoftInput(input, InputMethodManager.SHOW_IMPLICIT);
        }
    }

    public void clearSearch() {
        EditText input = getSearchInput();
        if (input != null) {
            input.setText("");
            input.clearFocus();
        }
        ImageView clear = getSearchClear();
        if (clear != null) {
            clear.setVisibility(GONE);
        }
    }

    private void bindScenes() {
        refreshScenes();
    }

    private void refreshScenes() {
        List<GreeSceneCatalog.SceneItem> scenes = GreeSceneCatalog.getEnabledScenes(getContext());
        TextView subtitle = findViewById(R.id.gree_section_scenes_sub);
        if (subtitle != null) {
            subtitle.setText(getContext().getString(
                    R.string.gree_section_scenes_sub_format, scenes.size()));
        }

        LinearLayout grid = findViewById(R.id.gree_scenes_grid);
        grid.removeAllViews();
        if (scenes.isEmpty()) {
            return;
        }

        View[] sceneViews = new View[scenes.size()];
        addTwoColumnGrid(grid, scenes.size(), (row, col) -> {
            int index = row * 2 + col;
            GreeSceneCatalog.SceneItem scene = scenes.get(index);
            View card = inflateCard(R.layout.item_gree_scene_card);
            ImageView icon = card.findViewById(R.id.scene_icon);
            icon.setImageResource(scene.iconRes);
            GreeImageClip.clipRound(icon, dp(12));
            ((TextView) card.findViewById(R.id.scene_title)).setText(scene.titleRes);
            ((TextView) card.findViewById(R.id.scene_desc)).setText(scene.descRes);
            sceneViews[index] = card;
            card.setOnClickListener(v -> {
                boolean wasSelected = v.isSelected();
                for (View other : sceneViews) {
                    if (other != null) {
                        other.setSelected(false);
                    }
                }
                if (!wasSelected) {
                    v.setSelected(true);
                }
            });
            return card;
        });
        equalizeGridCardHeights(grid);
    }

    private void bindBanner() {
        bannerPager = findViewById(R.id.gree_banner_pager);
        bannerDots = findViewById(R.id.gree_banner_dots);
        BannerItem[] banners = {
                new BannerItem(R.drawable.gree_banner_bg_1, R.string.gree_banner_tag_new,
                        R.string.gree_banner_1_title, R.string.gree_banner_1_desc,
                        R.string.gree_banner_1_btn, R.drawable.m_dehum),
                new BannerItem(R.drawable.gree_banner_bg_2, R.string.gree_banner_tag_sale,
                        R.string.gree_banner_2_title, R.string.gree_banner_2_desc,
                        R.string.gree_banner_2_btn, R.drawable.m_ac),
                new BannerItem(R.drawable.gree_banner_bg_3, R.string.gree_banner_tag_live,
                        R.string.gree_banner_3_title, R.string.gree_banner_3_desc,
                        R.string.gree_banner_3_btn, 0),
        };
        bannerPager.setAdapter(new BannerAdapter(banners));
        bannerPager.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageSelected(int position) {
                bannerIndex = position;
                updateBannerDots(position);
            }
        });
        buildBannerDots(banners.length);
    }

    private void buildBannerDots(int count) {
        bannerDots.removeAllViews();
        Context context = getContext();
        int gap = dp(4);
        for (int i = 0; i < count; i++) {
            View dot = new View(context);
            LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(dp(i == 0 ? 11 : 4), dp(4));
            if (i > 0) {
                lp.setMarginStart(gap);
            }
            dot.setLayoutParams(lp);
            dot.setBackgroundResource(i == 0 ? R.drawable.gree_banner_dot_on : R.drawable.gree_banner_dot_off);
            bannerDots.addView(dot);
        }
    }

    private void updateBannerDots(int selected) {
        for (int i = 0; i < bannerDots.getChildCount(); i++) {
            View dot = bannerDots.getChildAt(i);
            ViewGroup.LayoutParams lp = dot.getLayoutParams();
            lp.width = dp(i == selected ? 11 : 4);
            dot.setLayoutParams(lp);
            dot.setBackgroundResource(i == selected ? R.drawable.gree_banner_dot_on
                    : R.drawable.gree_banner_dot_off);
        }
    }

    private void bindGreeServices() {
        LinearLayout grid = findViewById(R.id.gree_services_grid);
        ServiceCard[] services = {
                new ServiceCard(R.drawable.m_clean, R.string.gree_svc_clean_title, R.string.gree_svc_clean_desc, false),
                new ServiceCard(R.drawable.lw_ac, R.string.gree_svc_trade_title, R.string.gree_svc_trade_desc, true),
                new ServiceCard(R.drawable.m_ac, R.string.gree_svc_weather_title, R.string.gree_svc_weather_desc, false),
                new ServiceCard(R.drawable.ai_energy, R.string.gree_svc_report_title, R.string.gree_svc_report_desc, false),
        };
        addTwoColumnGrid(grid, services.length, (row, col) -> {
            ServiceCard service = services[row * 2 + col];
            View card = inflateCard(R.layout.item_gree_service_card);
            ImageView icon = card.findViewById(R.id.service_icon);
            if (service.fitContain) {
                icon.setScaleType(ImageView.ScaleType.FIT_CENTER);
                icon.setPadding(dp(6), dp(6), dp(6), dp(6));
                icon.setCropToPadding(true);
            }
            icon.setImageResource(service.iconRes);
            GreeImageClip.clipRound(icon, dp(12));
            ((TextView) card.findViewById(R.id.service_title)).setText(service.titleRes);
            ((TextView) card.findViewById(R.id.service_desc)).setText(service.descRes);
            int index = row * 2 + col;
            String title = getContext().getString(service.titleRes);
            card.setOnClickListener(v -> {
                if (index == 0) {
                    showCleanServiceDialog();
                    return;
                }
                toast(title);
            });
            return card;
        });
        equalizeGridCardHeights(grid);
    }

    private void bindWeatherForecast(View weatherCard) {
        LinearLayout row = weatherCard.findViewById(R.id.gree_weather_forecast_row);
        row.removeAllViews();
        LayoutInflater inflater = LayoutInflater.from(getContext());
        for (GreePhoneWeather.DayForecast day : GreePhoneWeather.FORECAST_5_DAYS) {
            View item = inflater.inflate(R.layout.item_gree_weather_forecast_day, row, false);
            LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
            item.setLayoutParams(lp);
            ((TextView) item.findViewById(R.id.weather_day_label)).setText(day.labelRes);
            ((TextView) item.findViewById(R.id.weather_day_condition)).setText(day.conditionRes);
            ((TextView) item.findViewById(R.id.weather_day_temp)).setText(
                    getContext().getString(R.string.gree_weather_temp_range, day.lowTemp, day.highTemp));
            row.addView(item);
        }
    }

    private void bindPhoneServices() {
        LinearLayout container = findViewById(R.id.gree_phone_services);
        View weather = inflateCard(R.layout.item_gree_weather_card);
        bindWeatherForecast(weather);
        GreeImageClip.clipRound(weather, getResources().getDimension(R.dimen.gree_card_radius));
        String weatherUrl = "https://baidu2.weather.com.cn/mweather15d/101320101.shtml";
        weather.setOnClickListener(v -> {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(weatherUrl));
            getContext().startActivity(intent);
        });
        container.addView(wrapFullWidth(weather));

        PhoneCard[] cards = {
                new PhoneCard("#E3ECFD", "📅", R.string.gree_phone_cal_title, R.string.gree_phone_cal_desc),
                new PhoneCard("#F6ECE1", "📦", R.string.gree_phone_exp_title, R.string.gree_phone_exp_desc),
                new PhoneCard("#E0F2F4", "🚄", R.string.gree_phone_trip_title, R.string.gree_phone_trip_desc),
                new PhoneCard("#F3EDFB", "📝", R.string.gree_phone_memo_title, R.string.gree_phone_memo_desc),
        };
        View[] phoneCardViews = new View[cards.length];
        addTwoColumnGrid(container, cards.length, (row, col) -> {
            int index = row * 2 + col;
            PhoneCard cardData = cards[index];
            View card = inflateCard(R.layout.item_gree_phone_service);
            FrameLayout iconWrap = card.findViewById(R.id.phone_icon_wrap);
            GradientDrawable bg = new GradientDrawable();
            bg.setShape(GradientDrawable.RECTANGLE);
            bg.setCornerRadius(dp(14));
            bg.setColor(parseColorSafe(cardData.bgColor));
            iconWrap.setBackground(bg);
            TextView emoji = card.findViewById(R.id.phone_icon_emoji);
            emoji.setVisibility(VISIBLE);
            emoji.setText(cardData.emoji);
            ((TextView) card.findViewById(R.id.phone_title)).setText(cardData.titleRes);
            ((TextView) card.findViewById(R.id.phone_desc)).setText(cardData.descRes);
            String title = getContext().getString(cardData.titleRes);
            card.setOnClickListener(v -> {
                if (index == 0) {
                    if (openCalendarApp()) {
                        return;
                    }
                    toast(title);
                    return;
                }
                if (index == 1) {
                    showExpressDialog();
                    return;
                }
                if (index == 2) {
                    showTripDialog();
                    return;
                }
                if (openNotesApp()) {
                    return;
                }
                toast(title);
            });
            phoneCardViews[index] = card;
            return card;
        });
        equalizeCardHeights(phoneCardViews);

        View news = inflateCard(R.layout.item_gree_news_card);
        ImageView newsImage = news.findViewById(R.id.news_image);
        GreeImageClip.clipRound(newsImage, dp(14));
        String newsUrl = "https://gree.com/";
        news.setOnClickListener(v -> {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(newsUrl));
            getContext().startActivity(intent);
        });
        container.addView(wrapFullWidth(news, 9));
    }

    private void showExpressDialog() {
        showCenteredDialog(
                "中通快递 · ZT7351881206",
                "格力净水器 RO 反渗透滤芯\n已到达：菜鸟驿站（小区东门店）\n取件码 8-2-6305\n今天 14:02 入库 · 请及时取件",
                "好的",
                null
        );
    }

    private void showTripDialog() {
        showCenteredDialog(
                "G6158 · 珠海 → 广州南",
                "周六 10:35 开 · 11:42 到\n二等座 06 车 12A · 张明\n已加入日历，出发前 1 小时提醒你\n珠海站当前客流平稳，建议 9:50 出门",
                "查看行程详情",
                null
        );
    }

    private void showCleanServiceDialog() {
        showCenteredDialog(
                "空调深度清洗预约",
                "客厅空调 · 累计运行 326 小时\n深度清洗套餐 ¥129（会员价 ¥99）\n最快明天 10:00-12:00 上门 · 格力认证工程师",
                "预约明天上午上门",
                () -> toast("已预约：明天 10:00 空调深度清洗上门服务")
        );
    }

    private void showCenteredDialog(String title, String message, String buttonText, Runnable action) {
        Dialog dialog = new Dialog(getContext());
        dialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
        dialog.setCancelable(true);

        LinearLayout root = new LinearLayout(getContext());
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(18), dp(18), dp(18), dp(18));

        GradientDrawable bg = new GradientDrawable();
        bg.setCornerRadius(dp(22));
        bg.setColor(Color.parseColor("#FFFDF9"));
        root.setBackground(bg);

        TextView titleView = new TextView(getContext());
        titleView.setText(title);
        titleView.setTextColor(Color.parseColor("#1C1A15"));
        titleView.setTextSize(15f);
        titleView.setTypeface(titleView.getTypeface(), android.graphics.Typeface.BOLD);

        TextView messageView = new TextView(getContext());
        messageView.setText(message);
        messageView.setTextColor(Color.parseColor("#6D675A"));
        messageView.setTextSize(11.5f);
        messageView.setLineSpacing(0f, 1.4f);
        LinearLayout.LayoutParams messageLp = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        messageLp.topMargin = dp(8);

        TextView button = new TextView(getContext());
        button.setText(buttonText);
        button.setGravity(Gravity.CENTER);
        button.setTextColor(Color.WHITE);
        button.setTextSize(13f);
        button.setTypeface(button.getTypeface(), android.graphics.Typeface.BOLD);
        GradientDrawable buttonBg = new GradientDrawable();
        buttonBg.setCornerRadius(dp(18));
        buttonBg.setColor(Color.parseColor("#DF7642"));
        button.setBackground(buttonBg);
        button.setPadding(dp(14), dp(10), dp(14), dp(10));
        LinearLayout.LayoutParams buttonLp = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        buttonLp.topMargin = dp(14);
        button.setOnClickListener(v -> {
            dialog.dismiss();
            if (action != null) {
                action.run();
            }
        });

        root.addView(titleView);
        root.addView(messageView, messageLp);
        root.addView(button, buttonLp);

        dialog.setContentView(root);
        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(Color.TRANSPARENT));
        }
        dialog.show();
    }

    private boolean openCalendarApp() {
        Context context = getContext();
        PackageManager pm = context.getPackageManager();

        Intent calendarMain = Intent.makeMainSelectorActivity(Intent.ACTION_MAIN, Intent.CATEGORY_APP_CALENDAR);
        calendarMain.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if (calendarMain.resolveActivity(pm) != null) {
            context.startActivity(calendarMain);
            return true;
        }

        Intent calendarView = new Intent(Intent.ACTION_VIEW, CalendarContract.CONTENT_URI);
        calendarView.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if (calendarView.resolveActivity(pm) != null) {
            context.startActivity(calendarView);
            return true;
        }
        return false;
    }

    private boolean openNotesApp() {
        Context context = getContext();
        PackageManager pm = context.getPackageManager();
        Intent launcherIntent = new Intent(Intent.ACTION_MAIN);
        launcherIntent.addCategory(Intent.CATEGORY_LAUNCHER);
        List<ResolveInfo> matches = pm.queryIntentActivities(launcherIntent, 0);
        List<String> keywords = Arrays.asList("便签", "笔记", "记事本", "备忘录", "notes", "note", "keep", "todo", "待办");
        for (ResolveInfo info : matches) {
            CharSequence labelCs = info.loadLabel(pm);
            String label = labelCs == null ? "" : labelCs.toString().toLowerCase(Locale.ROOT);
            for (String keyword : keywords) {
                if (label.contains(keyword.toLowerCase(Locale.ROOT))) {
                    Intent launch = pm.getLaunchIntentForPackage(info.activityInfo.packageName);
                    if (launch != null) {
                        launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        context.startActivity(launch);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private View wrapFullWidth(View child) {
        return wrapFullWidth(child, 0);
    }

    private View wrapFullWidth(View child, int topMarginDp) {
        int height = ViewGroup.LayoutParams.WRAP_CONTENT;
        ViewGroup.LayoutParams existing = child.getLayoutParams();
        if (existing != null && existing.height > 0) {
            height = existing.height;
        }
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, height);
        if (topMarginDp > 0) {
            lp.topMargin = dp(topMarginDp);
        }
        lp.bottomMargin = dp(9);
        child.setLayoutParams(lp);
        return child;
    }

    private interface GridFactory {
        View create(int row, int col);
    }

    private void addTwoColumnGrid(LinearLayout container, int itemCount, GridFactory factory) {
        int rows = (itemCount + 1) / 2;
        for (int row = 0; row < rows; row++) {
            LinearLayout rowLayout = new LinearLayout(getContext());
            rowLayout.setOrientation(LinearLayout.HORIZONTAL);
            LinearLayout.LayoutParams rowLp = new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            if (row > 0) {
                rowLp.topMargin = dp(9);
            }
            rowLayout.setLayoutParams(rowLp);

            for (int col = 0; col < 2; col++) {
                int index = row * 2 + col;
                if (index >= itemCount) {
                    break;
                }
                View card = factory.create(row, col);
                int height = ViewGroup.LayoutParams.WRAP_CONTENT;
                ViewGroup.LayoutParams existing = card.getLayoutParams();
                if (existing != null && existing.height > 0) {
                    height = existing.height;
                }
                LinearLayout.LayoutParams cardLp = new LinearLayout.LayoutParams(0, height, 1f);
                if (col == 0) {
                    cardLp.setMarginEnd(dp(9) / 2);
                } else {
                    cardLp.setMarginStart(dp(9) / 2);
                }
                card.setLayoutParams(cardLp);
                rowLayout.addView(card);
            }
            container.addView(rowLayout);
        }
    }

    private void equalizeGridCardHeights(LinearLayout grid) {
        grid.post(() -> {
            ArrayList<View> cards = new ArrayList<>();
            for (int row = 0; row < grid.getChildCount(); row++) {
                View child = grid.getChildAt(row);
                if (!(child instanceof ViewGroup)) {
                    continue;
                }
                ViewGroup rowLayout = (ViewGroup) child;
                for (int col = 0; col < rowLayout.getChildCount(); col++) {
                    cards.add(rowLayout.getChildAt(col));
                }
            }
            applyEqualCardHeight(cards);
        });
    }

    private void equalizeCardHeights(View[] cards) {
        if (cards == null || cards.length == 0 || cards[0] == null) {
            return;
        }
        cards[0].post(() -> applyEqualCardHeight(Arrays.asList(cards)));
    }

    private void applyEqualCardHeight(List<View> cards) {
        int maxHeight = 0;
        for (View card : cards) {
            if (card != null) {
                maxHeight = Math.max(maxHeight, card.getHeight());
            }
        }
        if (maxHeight <= 0) {
            return;
        }
        for (View card : cards) {
            if (card == null) {
                continue;
            }
            ViewGroup.LayoutParams lp = card.getLayoutParams();
            lp.height = maxHeight;
            card.setLayoutParams(lp);
        }
    }

    private View inflateCard(int layoutRes) {
        return LayoutInflater.from(getContext()).inflate(layoutRes, this, false);
    }

    private void toast(String message) {
        Toast.makeText(getContext(),
                getContext().getString(R.string.gree_toast_demo, message),
                Toast.LENGTH_SHORT).show();
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private int parseColorSafe(String color) {
        return android.graphics.Color.parseColor(color);
    }

    private static final class ServiceCard {
        final int iconRes;
        final int titleRes;
        final int descRes;
        final boolean fitContain;

        ServiceCard(int iconRes, int titleRes, int descRes, boolean fitContain) {
            this.iconRes = iconRes;
            this.titleRes = titleRes;
            this.descRes = descRes;
            this.fitContain = fitContain;
        }
    }

    private static final class PhoneCard {
        final String bgColor;
        final String emoji;
        final int titleRes;
        final int descRes;

        PhoneCard(String bgColor, String emoji, int titleRes, int descRes) {
            this.bgColor = bgColor;
            this.emoji = emoji;
            this.titleRes = titleRes;
            this.descRes = descRes;
        }
    }

    private static final class BannerItem {
        final int bgRes;
        final int tagRes;
        final int titleRes;
        final int descRes;
        final int btnRes;
        final int imageRes;

        BannerItem(int bgRes, int tagRes, int titleRes, int descRes, int btnRes, int imageRes) {
            this.bgRes = bgRes;
            this.tagRes = tagRes;
            this.titleRes = titleRes;
            this.descRes = descRes;
            this.btnRes = btnRes;
            this.imageRes = imageRes;
        }
    }

    private final class BannerAdapter extends RecyclerView.Adapter<BannerAdapter.Holder> {
        private final BannerItem[] items;

        BannerAdapter(BannerItem[] items) {
            this.items = items;
        }

        @NonNull
        @Override
        public Holder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.item_gree_banner, parent, false);
            view.setLayoutParams(new ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT));
            return new Holder(view);
        }

        @Override
        public void onBindViewHolder(@NonNull Holder holder, int position) {
            BannerItem item = items[position];
            holder.itemView.setBackgroundResource(item.bgRes);
            holder.itemView.setClipToOutline(true);
            holder.tag.setBackgroundResource(R.drawable.gree_banner_tag_bg);
            holder.tag.setText(item.tagRes);
            holder.title.setText(item.titleRes);
            holder.desc.setText(item.descRes);
            holder.btn.setText(item.btnRes);
            if (item.imageRes != 0) {
                holder.imageWrap.setVisibility(VISIBLE);
                holder.image.setImageResource(item.imageRes);
                GreeImageClip.clipRound(holder.imageWrap, dp(12));
                GreeImageClip.clipRound(holder.image, dp(12));
            } else {
                holder.imageWrap.setVisibility(GONE);
            }
            View.OnClickListener go = v -> toast(holder.title.getText().toString());
            holder.itemView.setOnClickListener(go);
            holder.btn.setOnClickListener(go);
            holder.btn.setOnTouchListener((v, event) -> {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        v.animate().scaleX(0.94f).scaleY(0.94f).setDuration(80).start();
                        break;
                    case MotionEvent.ACTION_UP:
                    case MotionEvent.ACTION_CANCEL:
                        v.animate().scaleX(1f).scaleY(1f).setDuration(80).start();
                        break;
                    default:
                        break;
                }
                return false;
            });
        }

        @Override
        public int getItemCount() {
            return items.length;
        }

        final class Holder extends RecyclerView.ViewHolder {
            final TextView tag;
            final TextView title;
            final TextView desc;
            final TextView btn;
            final View imageWrap;
            final ImageView image;

            Holder(@NonNull View itemView) {
                super(itemView);
                tag = itemView.findViewById(R.id.banner_tag);
                title = itemView.findViewById(R.id.banner_title);
                desc = itemView.findViewById(R.id.banner_desc);
                btn = itemView.findViewById(R.id.banner_btn);
                imageWrap = itemView.findViewById(R.id.banner_image_wrap);
                image = itemView.findViewById(R.id.banner_image);
            }
        }
    }
}
