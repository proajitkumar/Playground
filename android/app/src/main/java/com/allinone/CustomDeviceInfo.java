package com.allinone;

import android.annotation.SuppressLint;
import android.content.Context;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.zip.CRC32;
import java.util.zip.Checksum;

public class CustomDeviceInfo extends ReactContextBaseJavaModule {
    CustomDeviceInfo(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "GetDeviceInfo";
    }

    @SuppressLint("all")
    public static String getDeviceId(Context context) {
        return Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
    }

    @ReactMethod
    public void getAndroidId(Callback callback){
        try {
            String input = "Java Code Geeks - Java Examples";
//            Settings.Secure.getString(this.getContentResolver(),Settings.Secure.ANDROID_ID);
//            byte bytes[] =getDeviceId().getBytes();
            byte bytes[] =input.getBytes();
            Checksum checksum = new CRC32();
            checksum.update(bytes, 0, bytes.length);
            long checksumValue = checksum.getValue();
            String androidId =String.valueOf(checksumValue);
            callback.invoke(androidId);
        } catch (Exception e){
            callback.invoke(e);
        }


    }
}
