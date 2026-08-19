package com.hive.gree;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.DashPathEffect;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.view.View;

import androidx.annotation.Nullable;

/** Simplified geofence map from the innovation-layout profile design. */
public class ProfileGeoMapView extends View {

    private static final int[] MEMBER_POS_X = {172, 258, 148, 196};
    private static final int[] MEMBER_POS_Y = {96, 42, 118, 116};
    private static final boolean[] MEMBER_IN_FENCE = {true, false, true, true};

    private final Paint roadPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint blockPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint fencePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint homePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint homeLabelPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint memberPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint memberInnerPaint = new Paint(Paint.ANTI_ALIAS_FLAG);

    private int memberIndex;

    public ProfileGeoMapView(Context context) {
        super(context);
        init();
    }

    public ProfileGeoMapView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public ProfileGeoMapView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init() {
        roadPaint.setColor(Color.WHITE);
        blockPaint.setColor(Color.parseColor("#DCE8D2"));
        fencePaint.setColor(Color.parseColor("#1A73E8"));
        fencePaint.setStyle(Paint.Style.STROKE);
        fencePaint.setStrokeWidth(dp(1.5f));
        fencePaint.setPathEffect(new DashPathEffect(new float[]{dp(6f), dp(4f)}, 0f));
        homePaint.setColor(Color.parseColor("#1A73E8"));
        homeLabelPaint.setColor(Color.WHITE);
        homeLabelPaint.setTextSize(sp(8.5f));
        homeLabelPaint.setTextAlign(Paint.Align.CENTER);
        memberPaint.setColor(Color.parseColor("#34A853"));
        memberInnerPaint.setColor(Color.WHITE);
    }

    public void setMemberIndex(int memberIndex) {
        this.memberIndex = memberIndex;
        invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        float w = getWidth();
        float h = getHeight();
        if (w <= 0 || h <= 0) {
            return;
        }
        float sx = w / 344f;
        float sy = h / 180f;

        canvas.drawRect(0, sy * 78, w, sy * 92, roadPaint);
        canvas.drawRect(sx * 96, 0, sx * 110, h, roadPaint);
        canvas.drawRect(sx * 224, 0, sx * 236, h, roadPaint);
        canvas.drawRect(0, sy * 140, w, sy * 150, roadPaint);

        canvas.drawRoundRect(sx * 130, sy * 20, sx * 190, sy * 58, dp(5f), dp(5f), blockPaint);
        canvas.drawRoundRect(sx * 250, sy * 100, sx * 320, sy * 130, dp(5f), dp(5f), blockPaint);

        float homeX = sx * 172;
        float homeY = sy * 96;
        canvas.drawCircle(homeX, homeY, sx * 60, fencePaint);
        canvas.drawCircle(homeX, homeY, dp(10f), homePaint);
        canvas.drawText("家", homeX, homeY + sp(3f), homeLabelPaint);

        if (memberIndex >= 0 && memberIndex < MEMBER_POS_X.length) {
            float memberX = sx * MEMBER_POS_X[memberIndex];
            float memberY = sy * MEMBER_POS_Y[memberIndex];
            memberPaint.setColor(MEMBER_IN_FENCE[memberIndex]
                    ? Color.parseColor("#34A853")
                    : Color.parseColor("#F29900"));
            canvas.drawCircle(memberX, memberY, dp(9f), memberPaint);
            canvas.drawCircle(memberX, memberY, dp(3.6f), memberInnerPaint);
        }
    }

    private float dp(float value) {
        return value * getResources().getDisplayMetrics().density;
    }

    private float sp(float value) {
        return value * getResources().getDisplayMetrics().scaledDensity;
    }
}
