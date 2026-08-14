package com.cloudx.ios17.core.database.model;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.Ignore;
import androidx.room.PrimaryKey;

@Entity(tableName = "widget_items")
public class WidgetItem {

    public static final int DEFAULT_ORDER = 99999;

    @PrimaryKey
    public int id;

    @ColumnInfo(defaultValue = "0")
    public int height = 0;

    @ColumnInfo(name = "order", defaultValue = "99999")
    public int order = DEFAULT_ORDER;

    public WidgetItem() {
    }

    @Ignore
    public WidgetItem(int id) {
        this.id = id;
    }
}
