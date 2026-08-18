package com.hive.gree;

import android.graphics.Outline;
import android.view.View;
import android.view.ViewOutlineProvider;

/** Clips image views to rounded or circular outlines without a Material theme. */
final class GreeImageClip {

    private GreeImageClip() {
    }

    static void clipRound(View view, float cornerRadiusPx) {
        view.setClipToOutline(true);
        view.setOutlineProvider(new ViewOutlineProvider() {
            @Override
            public void getOutline(View v, Outline outline) {
                outline.setRoundRect(0, 0, v.getWidth(), v.getHeight(), cornerRadiusPx);
            }
        });
        view.addOnLayoutChangeListener((v, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom) -> {
            v.invalidateOutline();
        });
    }

    static void clipCircle(View view) {
        view.setClipToOutline(true);
        view.setOutlineProvider(new ViewOutlineProvider() {
            @Override
            public void getOutline(View v, Outline outline) {
                outline.setOval(0, 0, v.getWidth(), v.getHeight());
            }
        });
        view.addOnLayoutChangeListener((v, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom) -> {
            v.invalidateOutline();
        });
    }
}
