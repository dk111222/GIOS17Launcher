package foundation.e.lib.telemetry;

import android.content.Context;

/** No-op stand-in for /e/OS telemetry, which is not published on public Maven. */
public final class Telemetry {
    private Telemetry() {}

    public static void init(String dsn, Context context, boolean enabled) {}
}
