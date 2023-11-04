package com.example.module

import android.app.PictureInPictureParams
import android.content.Context
import android.content.Intent
import android.content.pm.ActivityInfo
import android.content.res.Configuration
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.util.Rational
import android.view.GestureDetector
import android.view.Gravity
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.widget.ImageView
import android.widget.SeekBar
import android.widget.TextView
import android.widget.Toast
import android.widget.VideoView
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_video_playback.PipMode
import kotlinx.android.synthetic.main.activity_video_playback.backButton
import kotlinx.android.synthetic.main.activity_video_playback.backward_forward_imageview
import kotlinx.android.synthetic.main.activity_video_playback.nextImageView
import kotlinx.android.synthetic.main.activity_video_playback.playPauseButton
import kotlinx.android.synthetic.main.activity_video_playback.previousImageView
import kotlinx.android.synthetic.main.activity_video_playback.videoNameTextView

class VideoPlaybackActivity : AppCompatActivity() {
    private lateinit var videoView : VideoView
    private lateinit var seekBar : SeekBar
    private lateinit var currentTimeTextView : TextView
    private lateinit var totalTimeTextView : TextView
    private val handler = Handler()
    private lateinit var gestureDetector : GestureDetector
    private var isPlaying = true
    private var doubleTapTime : Long = 0
    private var videoPosition : Int = 0
    private val forwardTime : Int = 10000 // 10 seconds
    private val backwardTime : Int = -10000 // 10 seconds

    //    private lateinit var backward_forward_imageview: ImageView
    private lateinit var forwardImageView : ImageView
    private lateinit var pauseCenterImageView : ImageView
    private lateinit var playCenterImageView : ImageView
    private lateinit var backwardImageView : ImageView
    private var currentVideoIndex : Int = 0
    private var videoUrls : ArrayList<String>? = null

    //    private val uiHandler = Handler(Looper.getMainLooper())
    private var isControlsVisible = true
    private var isVideoPaused = false

    lateinit var PipMode :ImageView


//    private val updateSeekBar = object : Runnable {
//        override fun run() {
//            if (videoView.isPlaying) {
//                val currentPosition = videoView.currentPosition
//                seekBar.progress = currentPosition
//                currentTimeTextView.text = formatTime(currentPosition)
//                handler.postDelayed(this, 1000) // Update every second
//            }
//        }
//    }

    override fun onCreate(savedInstanceState : Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_video_playback)
//        backward_forward_imageview = findViewById(R.id.backward_forward_imageview)
        // Initialize your ImageViews




        val playPauseButton = findViewById<ImageView>(R.id.playPauseButton)

        PipMode = findViewById(R.id.PipMode)
        forwardImageView = findViewById(R.id.forwardImageView)
        pauseCenterImageView = findViewById(R.id.pauseCenterImageView)
        playCenterImageView = findViewById(R.id.playCenterImageView)
        backwardImageView = findViewById(R.id.backwardImageView)
//        playPauseButton = findViewById<ImageView>(R.id.playPauseButton)
        videoView = findViewById(R.id.videoView)
        seekBar = findViewById(R.id.seekBar)
        currentTimeTextView = findViewById(R.id.currentTimeTextView)
        totalTimeTextView = findViewById(R.id.totalTimeTextView)
        val backButton = findViewById<ImageView>(R.id.backButton)

        // Set click listeners for "Next" and "Previous" buttons
        val nextImageView = findViewById<ImageView>(R.id.nextImageView)
        val previousImageView = findViewById<ImageView>(R.id.previousImageView)

        val videoNameTextView = findViewById<TextView>(R.id.videoNameTextView)

///////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////



        // Hide ActionBar (Title Bar)
        supportActionBar?.hide()
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        //         //Set immersive fullscreen mode
        window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_IMMERSIVE
                or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_FULLSCREEN
                or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                )

        // Hide the navigation bar (on-screen buttons)
        window.setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN ,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        )
        //        // Enable screen rotation
//        requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
//        requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_SENSOR

        // Receive the list of video URLs from the Intent
        videoUrls = intent.getStringArrayListExtra("videoUrls")

        if (videoUrls != null && videoUrls!!.isNotEmpty()) {
            this.videoUrls = videoUrls
            currentVideoIndex = intent.getIntExtra("currentVideoPosition" , 0)
            playVideo(videoUrls?.get(currentVideoIndex))
        } else {
//            showMessage("No videos available")
            Toast.makeText(this@VideoPlaybackActivity , "No videos available" , Toast.LENGTH_SHORT)
                .show()
            videoNameTextView.visibility = View.VISIBLE
        }
        // Initialize video playback with the first video URL
        playVideo(videoUrls!![currentVideoIndex])
        nextImageView.setOnClickListener {
            playNextVideo()
        }
        previousImageView.setOnClickListener {
            playPreviousVideo()
        }

//        var videoUrl = intent.getStringExtra("videoUrls")
//        videoView.setVideoURI(Uri.parse(videoUrl))
//        videoView.start()
        var currentVideoIndex = 0 // Keep track of the current video index

        videoView.setOnPreparedListener { mediaPlayer ->
            val duration = mediaPlayer.duration
            seekBar.max = duration
            totalTimeTextView.text = formatTime(duration)
//            handler.post(updateSeekBarRunnable)
            handler.postDelayed(updateSeekBar , 0)





            //    // Start updating the SeekBar progress and time
            seekBar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
                override fun onProgressChanged(
                    seekBar : SeekBar? ,
                    progress : Int ,
                    fromUser : Boolean
                ) {
                    if (fromUser) {
                        mediaPlayer.seekTo(progress)
                    }
                }

                override fun onStartTrackingTouch(seekBar : SeekBar?) {
                    handler.removeCallbacks(updateSeekBar)
                }

                override fun onStopTrackingTouch(seekBar : SeekBar?) {
                    mediaPlayer.seekTo(seekBar?.progress ?: 0)
                    handler.postDelayed(updateSeekBar , 1000)
                }
            })
            var isPlaying = true

            videoView.setOnCompletionListener {
                // Video has completed
                playPauseButton.setImageResource(R.drawable.play_large) // Change the button to play
                isPlaying = false
                videoPosition = 0 // Reset the video position to the beginning
                seekBar.progress = 0 // Reset the SeekBar to the beginning
                currentTimeTextView.text = "00:00" // Reset the timer to 0:00
                handler.removeCallbacks(updateSeekBar) // Stop the timer
                showControls()
            }
            playPauseButton.setOnClickListener {
                if (isPlaying) {
                    videoView.pause()
                    playPauseButton.setImageResource(R.drawable.play_large)
                    // Pause the timer

                    handler.removeCallbacks(updateSeekBar)
                } else {
                    videoView.start()
                    playPauseButton.setImageResource(R.drawable.pause_large)

                    // Start the timer again
                    handler.postDelayed(updateSeekBar , 0)

                }
                isPlaying = !isPlaying
            }
            playPauseButton.setOnClickListener {
                if (isPlaying) {
                    videoView.pause()
                    playPauseButton.setImageResource(R.drawable.play_large)
                    // Pause the timer

                    handler.removeCallbacks(updateSeekBar)
                } else {
                    videoView.start()
                    playPauseButton.setImageResource(R.drawable.pause_large)

                    // Start the timer again
                    handler.postDelayed(updateSeekBar , 0)

                }
                isPlaying = !isPlaying
            }


            // Set an OnClickListener for the back button
            backButton.setOnClickListener {
                finish() // Finish the current activity and go back
            }

            videoView.setOnTouchListener { _ , event ->
                when (event.action) {
                    MotionEvent.ACTION_DOWN -> {
                        toggleControlsVisibility()
                        val currentTime = System.currentTimeMillis()
                        toggleControlsVisibility()
                        if (currentTime - doubleTapTime < 300) {

                            // Double tap detected
                            val oneThirdWidth = videoView.width / 3

                            if (event.x < oneThirdWidth) {
                                // Double tap on the left part, seek backward
                                val newPosition = videoView.currentPosition + backwardTime
                                if (newPosition < 0) {
                                    mediaPlayer.seekTo(0)
                                    showActionImage(backwardImageView , R.drawable.backward_replay)
                                } else {
                                    mediaPlayer.seekTo(newPosition)
                                    showActionImage(backwardImageView , R.drawable.backward_replay)
                                }
                            } else if (event.x > 2 * oneThirdWidth) {
                                // Double tap on the right part, seek forward
                                val newPosition = videoView.currentPosition + forwardTime
                                if (newPosition > duration) {
                                    mediaPlayer.seekTo(duration)
                                    showActionImage(forwardImageView , R.drawable.forward)
                                } else {
                                    mediaPlayer.seekTo(newPosition)
                                    showActionImage(forwardImageView , R.drawable.forward)
                                }
                            } else {
                                // Double tap in the center, toggle play/pause
                                if (isVideoPaused) {
                                    videoView.start()

                                    playPauseButton.setImageResource(R.drawable.pause_large)
                                    showActionImage(pauseCenterImageView , R.drawable.pause_center)
                                } else {
                                    videoView.pause()
                                    showControls()
                                    playPauseButton.setImageResource(R.drawable.play_large)
                                    showActionImage(playCenterImageView , R.drawable.play_center)
                                }
                                isVideoPaused = !isVideoPaused
                            }
                        }
                        doubleTapTime = currentTime
                        // Hide the ImageView after 0.5 seconds
                        // Hide the ImageViews after 0.5 seconds
                        hideImageViewDelayed(700 , forwardImageView)
                        hideImageViewDelayed(700 , pauseCenterImageView)
                        hideImageViewDelayed(700 , backwardImageView)
                        hideImageViewDelayed(700 , playCenterImageView)
                    }
                }
                true
            }

            mediaPlayer.start()
            start_UI_hide_Controls(5000)  // function to hide UI
//            hideUIWhenVideoStartsPlaying()


        }    // // mediaplayer    bracket closed
    }    ////on create bracket closed






        ////////////////////UI hide ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
        // Function to play a video based on the provided index
        private fun toggleControlsVisibility() {
            if (isControlsVisible) {
                start_UI_hide_Controls(5000)
            } else {
                showControls()

            }
        }

        private fun showControls() {
            seekBar.visibility = View.VISIBLE
            currentTimeTextView.visibility = View.VISIBLE
            totalTimeTextView.visibility = View.VISIBLE
            playPauseButton.visibility = View.VISIBLE
            backButton.visibility = View.VISIBLE
            videoNameTextView.visibility = View.VISIBLE
            backward_forward_imageview.visibility = View.VISIBLE
            nextImageView.visibility = View.VISIBLE
            previousImageView.visibility = View.VISIBLE
            isControlsVisible = true
        }


        private fun start_UI_hide_Controls(delay : Long) {

            val handler = Handler()
            isControlsVisible = false
            handler.postDelayed({
                seekBar.visibility = View.INVISIBLE
                currentTimeTextView.visibility = View.INVISIBLE
                totalTimeTextView.visibility = View.INVISIBLE
                playPauseButton.visibility = View.INVISIBLE
                backButton.visibility = View.INVISIBLE
                videoNameTextView.visibility = View.INVISIBLE
                backward_forward_imageview.visibility = View.INVISIBLE
                nextImageView.visibility = View.INVISIBLE
                previousImageView.visibility = View.INVISIBLE
                backwardImageView.visibility = View.INVISIBLE
                forwardImageView.visibility = View.INVISIBLE
                pauseCenterImageView.visibility = View.INVISIBLE
                playCenterImageView.visibility = View.INVISIBLE

//
            } , delay)
        }
//    private fun UIhideControls() {
//        seekBar.visibility = View.INVISIBLE
//        currentTimeTextView.visibility = View.INVISIBLE
//        isControlsVisible = false
//    }
/////////////////////////////////////////////////////////////////////////////////////////


        private fun playVideo(videoUrl : String?) {
            val videoNameTextView = findViewById<TextView>(R.id.videoNameTextView)
            videoView.setVideoURI(Uri.parse(videoUrl))
            videoView.start()
            playPauseButton.setImageResource(R.drawable.pause_large)
            videoView.setOnCompletionListener {
                playPauseButton.setImageResource(R.drawable.play_large)
            }
            videoNameTextView.text = extractVideoName(videoUrl)
            videoNameTextView.visibility = View.VISIBLE


        }


        private fun extractVideoName(videoUrl : String?) : String {
            return videoUrl?.substringAfterLast('/')!!.substringBeforeLast('.')
        }


        private fun playNextVideo() =
            //            showMessage("No next video available")
            if (currentVideoIndex + 1 < videoUrls?.size ?: 0) {
                currentVideoIndex++
                playVideo(videoUrls?.get(currentVideoIndex))
            } else {
//            Toast.makeText(this@VideoPlaybackActivity,"No next video",Toast.LENGTH_SHORT).show()
                            showCustomToast(this , "No next video" , R.drawable.railway , Gravity.BOTTOM , 0 , 200)
            }

        private fun playPreviousVideo() {
            if (currentVideoIndex > 0) {
                currentVideoIndex--
                playVideo(videoUrls?.get(currentVideoIndex))
            } else {
//            showMessage("No previous video available")
//            Toast.makeText(this@VideoPlaybackActivity,"No previous video",Toast.LENGTH_SHORT).show()
                showCustomToast(
                    this , "No previous video" ,
                    R.drawable.railway , Gravity.BOTTOM , 0 , 200
                )
            }
        }

        // Function to display a message
        private fun showMessage(message : String) {
            // You can use a dialog or any other UI element to display the message
            val alertDialog = AlertDialog.Builder(this)
                .setTitle("Message")
                .setMessage(message)
                .setPositiveButton("OK" , null)
                .create()
            alertDialog.show()
        }

        // Function to show the ImageView with the specified drawable
        private fun showActionImage(imageView : ImageView , drawableResId : Int) {
            imageView.setImageResource(drawableResId)
            imageView.visibility = View.VISIBLE
        }

        // Function to hide the ImageView after a delay
        private fun hideImageViewDelayed(delay : Long , imageView : ImageView) {
            val handler = Handler()
            handler.postDelayed({
                imageView.visibility = View.GONE
            } , delay)
        }


        private val updateSeekBar = object : Runnable {
            override fun run() {
                if (videoView.isPlaying) {
                    val currentPosition = videoView.currentPosition
                    seekBar.progress = currentPosition
                    currentTimeTextView.text = formatTime(currentPosition)
                    handler.postDelayed(this , 1000)
                }
            }
        }


        private fun formatTime(ms : Int) : String {
            val seconds = ms / 1000
            val minutes = seconds / 60
            val hours = minutes / 60
            val remainingSeconds = seconds % 60
            val remainingMinutes = minutes % 60

//        return String.format("%02d:%02d", minutes, remainingSeconds)
            if (hours > 0) {
                return String.format("%d:%02d:%02d" , hours , remainingMinutes , remainingSeconds)
            } else {
                return String.format("%02d:%02d" , remainingMinutes , remainingSeconds)
            }

        }

        /*
    override fun onPictureInPictureModeChanged(isInPictureInPictureMode: Boolean) {
    if (isInPictureInPictureMode) {
    // App is in PiP mode
    // Handle PiP-specific UI changes or interactions
    } else {
    // App is not in PiP mode
    // Restore the full-screen video display or any other desired behavior
    }
    }
    */
/////////////////////////////////////////////////////////////////////////////////////////
        override fun onUserLeaveHint() {
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                val params = PictureInPictureParams.Builder().build()
                enterPictureInPictureMode(params)
            }
        }



//////////////////////////////////////////////////////////////////////////////////////////////


        override fun onPause() {
            super.onPause()
//        videoView.pause()
            if (videoView.isPlaying)
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                if (!isInPictureInPictureMode) {
                    videoView.pause()
                }
            }
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                if (!isInPictureInPictureMode) {
                    videoView.pause()
                }
            }
        }

        override fun onResume() {
            super.onResume()
            if (videoPosition > 0) {
                videoView.seekTo(videoPosition)
                videoView.start()
                isPlaying = true
                playPauseButton.setImageResource(R.drawable.pause_large)
            }
        }


        override fun onDestroy() {
            super.onDestroy()
            handler.removeCallbacks(updateSeekBar)
            videoView.stopPlayback()
            requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
            window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_VISIBLE
        }

        //
        override fun onBackPressed() {
            AlertDialog.Builder(this)
                .setTitle("Exit Video Playback")
                .setMessage("Are you sure you want to exit video playback?")
                .setPositiveButton("Yes") { _ , _ ->
                    finish()
                }
                .setNegativeButton("No" , null)
                .show()

        }

        fun showCustomToast(
            context : Context ,
            text : String ,
            imageResource : Int ,
            gravity : Int ,
            xOffset : Int ,
            yOffset : Int
        ) {
            val inflater =
                (context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater)
            val layout = inflater.inflate(R.layout.custom_toast_layout , null)

            val toastImage = layout.findViewById<ImageView>(R.id.toastImage)
            toastImage.setImageResource(imageResource)

            val toastText = layout.findViewById<TextView>(R.id.toastText)
            toastText.text = text

            val toast = Toast(context)
            toast.setGravity(gravity , xOffset , yOffset)
            toast.duration = Toast.LENGTH_LONG
            toast.view = layout
            toast.show()
        }

    }