package com.hive.gree;

import android.content.Context;
import android.graphics.drawable.GradientDrawable;
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
    }

    private void bindTopBar() {
        findViewById(R.id.gree_search_bar).setOnClickListener(
                v -> toast(getContext().getString(R.string.gree_search_hint)));
        findViewById(R.id.gree_scan_btn).setOnClickListener(
                v -> toast("扫一扫"));
        findViewById(R.id.gree_avatar_btn).setOnClickListener(
                v -> toast("个人中心"));
        findViewById(R.id.gree_all_devices_btn).setOnClickListener(
                v -> toast("全部设备"));
        findViewById(R.id.gree_scene_settings_btn).setOnClickListener(
                v -> toast("场景设置"));
    }

    private void bindScenes() {
        LinearLayout grid = findViewById(R.id.gree_scenes_grid);
        SceneCard[] scenes = {
                new SceneCard(R.drawable.sc_home, R.string.gree_scene_home, R.string.gree_scene_home_desc),
                new SceneCard(R.drawable.sc_away, R.string.gree_scene_away, R.string.gree_scene_away_desc),
                new SceneCard(R.drawable.sc_movie, R.string.gree_scene_movie, R.string.gree_scene_movie_desc),
                new SceneCard(R.drawable.sc_sleep, R.string.gree_scene_sleep, R.string.gree_scene_sleep_desc),
        };
        addTwoColumnGrid(grid, scenes.length, (row, col) -> {
            int index = row * 2 + col;
            SceneCard scene = scenes[index];
            View card = inflateCard(R.layout.item_gree_scene_card);
            ((ImageView) card.findViewById(R.id.scene_icon)).setImageResource(scene.iconRes);
            ((TextView) card.findViewById(R.id.scene_title)).setText(scene.titleRes);
            ((TextView) card.findViewById(R.id.scene_desc)).setText(scene.descRes);
            String title = getContext().getString(scene.titleRes);
            card.setOnClickListener(v -> toast(getContext().getString(R.string.gree_toast_scene, title)));
            return card;
        });
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
                new ServiceCard(R.drawable.m_clean, R.string.gree_svc_clean_title, R.string.gree_svc_clean_desc),
                new ServiceCard(R.drawable.lw_ac, R.string.gree_svc_trade_title, R.string.gree_svc_trade_desc),
                new ServiceCard(R.drawable.m_ac, R.string.gree_svc_weather_title, R.string.gree_svc_weather_desc),
                new ServiceCard(R.drawable.ai_energy, R.string.gree_svc_report_title, R.string.gree_svc_report_desc),
        };
        addTwoColumnGrid(grid, services.length, (row, col) -> {
            ServiceCard service = services[row * 2 + col];
            View card = inflateCard(R.layout.item_gree_service_card);
            ((ImageView) card.findViewById(R.id.service_icon)).setImageResource(service.iconRes);
            ((TextView) card.findViewById(R.id.service_title)).setText(service.titleRes);
            ((TextView) card.findViewById(R.id.service_desc)).setText(service.descRes);
            String title = getContext().getString(service.titleRes);
            card.setOnClickListener(v -> toast(title));
            return card;
        });
    }

    private void bindPhoneServices() {
        LinearLayout container = findViewById(R.id.gree_phone_services);
        View weather = inflateCard(R.layout.item_gree_weather_card);
        weather.setOnClickListener(v -> toast("天气"));
        container.addView(wrapFullWidth(weather));

        PhoneCard[] cards = {
                new PhoneCard("#E3ECFD", "📅", R.string.gree_phone_cal_title, R.string.gree_phone_cal_desc),
                new PhoneCard("#F6ECE1", "📦", R.string.gree_phone_exp_title, R.string.gree_phone_exp_desc),
                new PhoneCard("#E0F2F4", "🚄", R.string.gree_phone_trip_title, R.string.gree_phone_trip_desc),
                new PhoneCard("#F3EDFB", "📝", R.string.gree_phone_memo_title, R.string.gree_phone_memo_desc),
        };
        addTwoColumnGrid(container, cards.length, (row, col) -> {
            PhoneCard cardData = cards[row * 2 + col];
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
            card.setOnClickListener(v -> toast(title));
            return card;
        });

        View news = inflateCard(R.layout.item_gree_news_card);
        news.setOnClickListener(v -> toast("新闻速览"));
        container.addView(wrapFullWidth(news));
    }

    private View wrapFullWidth(View child) {
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
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
                LinearLayout.LayoutParams cardLp = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
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

    private static final class SceneCard {
        final int iconRes;
        final int titleRes;
        final int descRes;

        SceneCard(int iconRes, int titleRes, int descRes) {
            this.iconRes = iconRes;
            this.titleRes = titleRes;
            this.descRes = descRes;
        }
    }

    private static final class ServiceCard {
        final int iconRes;
        final int titleRes;
        final int descRes;

        ServiceCard(int iconRes, int titleRes, int descRes) {
            this.iconRes = iconRes;
            this.titleRes = titleRes;
            this.descRes = descRes;
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
            holder.tag.setBackgroundResource(R.drawable.gree_banner_tag_bg);
            holder.tag.setText(item.tagRes);
            holder.title.setText(item.titleRes);
            holder.desc.setText(item.descRes);
            holder.btn.setText(item.btnRes);
            if (item.imageRes != 0) {
                holder.image.setVisibility(VISIBLE);
                holder.image.setImageResource(item.imageRes);
            } else {
                holder.image.setVisibility(GONE);
            }
            holder.itemView.setOnClickListener(
                    v -> toast(holder.title.getText().toString()));
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
            final ImageView image;

            Holder(@NonNull View itemView) {
                super(itemView);
                tag = itemView.findViewById(R.id.banner_tag);
                title = itemView.findViewById(R.id.banner_title);
                desc = itemView.findViewById(R.id.banner_desc);
                btn = itemView.findViewById(R.id.banner_btn);
                image = itemView.findViewById(R.id.banner_image);
            }
        }
    }
}
