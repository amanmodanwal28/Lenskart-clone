package com.example.module

import android.app.Service
import android.content.Intent
import android.media.MediaPlayer
import android.os.IBinder

class VideoPlaybackService : Service() {

    private var mediaPlayer: MediaPlayer? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        mediaPlayer = MediaPlayer()
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    fun playVideo(videoUrl: String) {
        try {
            mediaPlayer?.reset()
            mediaPlayer?.setDataSource(videoUrl)
            mediaPlayer?.prepare()
            mediaPlayer?.start()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun stopVideo() {
        mediaPlayer?.stop()
        mediaPlayer?.release()
        mediaPlayer = null
    }
}
