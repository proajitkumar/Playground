package com.allinone;

import android.net.Uri;
import android.widget.VideoView;
import android.widget.EditText;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class TextInputManager extends SimpleViewManager<EditText> {
    public static final String REACT_CLASS = "TextInput";
    @Override
    public String getName() {
        return REACT_CLASS;
    }
    @Override
    protected EditText createViewInstance(ThemedReactContext reactContext) {
        EditText editText = new EditText(reactContext);
        return editText;
    }

    @ReactProp(name="value")
    public void setVideoPath(EditText editText, String value) {
        editText.setText(value);
    }
}
