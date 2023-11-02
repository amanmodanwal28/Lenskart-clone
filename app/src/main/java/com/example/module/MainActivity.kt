//package com.example.module

package com.example.module

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.ConnectivityManager
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.os.StrictMode
import android.view.View
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import org.jsoup.Jsoup
import java.io.IOException
import java.util.regex.Pattern

class MainActivity : AppCompatActivity() {

    private lateinit var listView: ListView
    private lateinit var wifiStatusTextView: TextView
    private val refreshHandler = Handler()
    private val refreshIntervalMillis = 2000 // 2 seconds
    private val directoryStack = mutableListOf<String>()
    private val result = ArrayList<String>()
    private var currentDirectoryUrl = "http://192.168.11.54/pps-app/kidszone/"
    private var isWifiConnected = false


    private val networkChangeReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            checkWifiStatus()
        }
    }



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)




        listView = findViewById(R.id.listView)
        wifiStatusTextView = findViewById(R.id.wifiStatusTextView)

        // Hide the Wi-Fi status message by default
        wifiStatusTextView.visibility = View.GONE

        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)

        // Start periodic data refresh
        startDataRefreshThread()
    }

    override fun onResume() {
        super.onResume()

        // Register the network change receiver to check Wi-Fi status changes
        val filter = IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION)
        registerReceiver(networkChangeReceiver, filter)

        // Check Wi-Fi status on resume
        checkWifiStatus()
    }

    override fun onPause() {
        super.onPause()

        // Unregister the network change receiver
        unregisterReceiver(networkChangeReceiver)
    }

    private fun checkWifiStatus() {
        val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val networkInfo = connectivityManager.activeNetworkInfo

        isWifiConnected = networkInfo != null && networkInfo.type == ConnectivityManager.TYPE_WIFI

        if (isWifiConnected) {
            // Wi-Fi is connected, hide the message
            wifiStatusTextView.visibility = View.GONE
        } else {
            // Wi-Fi is not connected, show the message
            wifiStatusTextView.visibility = View.VISIBLE
            wifiStatusTextView.text = "Wi-Fi is not connected. Please connect to Wi-Fi."
        }
    }




    private fun startDataRefreshThread() {
        Thread {
            while (true) {
                fetchFileList(currentDirectoryUrl)
                updateUIAfterRefresh()
                Thread.sleep(refreshIntervalMillis.toLong())
            }
        }.start()
    }

    private fun fetchFileList(url: String) {
        try {
            val doc = Jsoup.connect(url).get()
            val links = doc.select("a[href]")
            result.clear()



            for (link in links) {
                val href = link.attr("href")
                if (!href.contains("..")) {
                    val decodedName = Uri.decode(href)
                    result.add(decodedName)

                }
            }

            result.sortWith(Comparator { s1, s2 ->
                val pattern = Pattern.compile("\\d+")
                val matcher1 = pattern.matcher(s1)
                val matcher2 = pattern.matcher(s2)

                while (matcher1.find() && matcher2.find()) {
                    val alphabeticPart1 = s1.split(matcher1.group())[0]
                    val alphabeticPart2 = s2.split(matcher2.group())[0]

                    if (alphabeticPart1 != alphabeticPart2) {
                        return@Comparator alphabeticPart1.compareTo(alphabeticPart2)
                    }

                    val numericPart1 = matcher1.group().toInt()
                    val numericPart2 = matcher2.group().toInt()

                    if (numericPart1 != numericPart2) {
                        return@Comparator numericPart1 - numericPart2
                    }
                }

                s1.compareTo(s2)
            })

        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    private fun updateUIAfterRefresh() {
        runOnUiThread {
            val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, result)
            listView.adapter = adapter

            listView.setOnItemClickListener { _, _, position, _ ->
                val selectedItem = result[position]
//                val selectedUrl = "$currentDirectoryUrl$selectedItem"

                val selectedUrl = "$currentDirectoryUrl$selectedItem"

                if (selectedUrl.endsWith("/")) {
                    navigateToSubfolder(selectedUrl)
                } else if (selectedUrl.endsWith(".mp4")) {
//                    openVideo(selectedUrl, selectedItem)
                    // Create an ArrayList with all video URLs and start VideoPlaybackActivity
                    val videoUrls = result
                        .filter { it.endsWith(".mp4")   }
                        .map { "$currentDirectoryUrl$it" } as ArrayList<String>

                    val intent = Intent(this, VideoPlaybackActivity::class.java)

//                    intent.putStringArrayListExtra("videoUrls", videoUrls)
//                    startActivity(intent)
                    // Pass the current video's position to VideoPlaybackActivity
                    val selectedVideoPosition = videoUrls.indexOf(selectedUrl)
                    intent.putStringArrayListExtra("videoUrls", videoUrls)
                    intent.putExtra("currentVideoPosition", selectedVideoPosition)

                    startActivity(intent)
                }
                // In your MainActivity when starting VideoPlaybackActivity


            }
        }
    }


    private fun navigateToSubfolder(folderUrl: String) {
        directoryStack.add(currentDirectoryUrl)
        currentDirectoryUrl = folderUrl
    }

    private fun openVideo(fileUrl: String, videoName: String) {
        val selectedFileUrl = currentDirectoryUrl + videoName
        if (selectedFileUrl.endsWith(".mp4")) {
            val intent = Intent(this, VideoPlaybackActivity::class.java)
            intent.putExtra("videoUrl", selectedFileUrl)
            startActivity(intent)
        }
    }


    override fun onBackPressed() {
        if (directoryStack.isNotEmpty()) {
            currentDirectoryUrl = directoryStack.removeAt(directoryStack.size - 1)
        } else {
            super.onBackPressed()
        }
    }
}
//in my given code we need to hide the extension name in video files butwhen we play then they play is this possible









////package com.example.module
//
//package com.example.module
//
//import android.content.BroadcastReceiver
//import android.content.Context
//import android.content.Intent
//import android.content.IntentFilter
//import android.net.ConnectivityManager
//import android.net.Uri
//import android.os.Bundle
//import android.os.Handler
//import android.os.StrictMode
//import android.view.View
//import android.widget.ArrayAdapter
//import android.widget.ListView
//import android.widget.TextView
//import androidx.appcompat.app.AppCompatActivity
//import org.jsoup.Jsoup
//import java.io.IOException
//import java.util.regex.Pattern
//
//class MainActivity : AppCompatActivity() {
//
//    private lateinit var listView: ListView
//    private lateinit var wifiStatusTextView: TextView
//    private val refreshHandler = Handler()
//    private val refreshIntervalMillis = 2000 // 2 seconds
//    private val directoryStack = mutableListOf<String>()
//    private val result = ArrayList<String>()
//    private var currentDirectoryUrl = "http://192.168.11.54/pps-app/kidszone/"
//    private var isWifiConnected = false
//
//
//    private val networkChangeReceiver = object : BroadcastReceiver() {
//        override fun onReceive(context: Context?, intent: Intent?) {
//            checkWifiStatus()
//        }
//    }
//
//
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//
//
//
//
//        listView = findViewById(R.id.listView)
//        wifiStatusTextView = findViewById(R.id.wifiStatusTextView)
//
//        // Hide the Wi-Fi status message by default
//        wifiStatusTextView.visibility = View.GONE
//
//        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
//        StrictMode.setThreadPolicy(policy)
//
//        // Start periodic data refresh
//        startDataRefreshThread()
//    }
//
//    override fun onResume() {
//        super.onResume()
//
//        // Register the network change receiver to check Wi-Fi status changes
//        val filter = IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION)
//        registerReceiver(networkChangeReceiver, filter)
//
//        // Check Wi-Fi status on resume
//        checkWifiStatus()
//    }
//
//    override fun onPause() {
//        super.onPause()
//
//        // Unregister the network change receiver
//        unregisterReceiver(networkChangeReceiver)
//    }
//
//    private fun checkWifiStatus() {
//        val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
//        val networkInfo = connectivityManager.activeNetworkInfo
//
//        isWifiConnected = networkInfo != null && networkInfo.type == ConnectivityManager.TYPE_WIFI
//
//        if (isWifiConnected) {
//            // Wi-Fi is connected, hide the message
//            wifiStatusTextView.visibility = View.GONE
//        } else {
//            // Wi-Fi is not connected, show the message
//            wifiStatusTextView.visibility = View.VISIBLE
//            wifiStatusTextView.text = "Wi-Fi is not connected. Please connect to Wi-Fi."
//        }
//    }
//
//
//
//
//    private fun startDataRefreshThread() {
//        Thread {
//            while (true) {
//                fetchFileList(currentDirectoryUrl)
//                updateUIAfterRefresh()
//                Thread.sleep(refreshIntervalMillis.toLong())
//            }
//        }.start()
//    }
//
//    private fun fetchFileList(url: String) {
//        try {
//            val doc = Jsoup.connect(url).get()
//            val links = doc.select("a[href]")
//            result.clear()
//
//
//
//            for (link in links) {
//                val href = link.attr("href")
//                if (!href.contains("..")) {
//                    val decodedName = Uri.decode(href)
//                    result.add(decodedName)
//
//                }
//            }
//
//            result.sortWith(Comparator { s1, s2 ->
//                val pattern = Pattern.compile("\\d+")
//                val matcher1 = pattern.matcher(s1)
//                val matcher2 = pattern.matcher(s2)
//
//                while (matcher1.find() && matcher2.find()) {
//                    val alphabeticPart1 = s1.split(matcher1.group())[0]
//                    val alphabeticPart2 = s2.split(matcher2.group())[0]
//
//                    if (alphabeticPart1 != alphabeticPart2) {
//                        return@Comparator alphabeticPart1.compareTo(alphabeticPart2)
//                    }
//
//                    val numericPart1 = matcher1.group().toInt()
//                    val numericPart2 = matcher2.group().toInt()
//
//                    if (numericPart1 != numericPart2) {
//                        return@Comparator numericPart1 - numericPart2
//                    }
//                }
//
//                s1.compareTo(s2)
//            })
//
//        } catch (e: IOException) {
//            e.printStackTrace()
//        }
//    }
//
//    private fun updateUIAfterRefresh() {
//        runOnUiThread {
//            val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, result)
//            listView.adapter = adapter
//
//            listView.setOnItemClickListener { _, _, position, _ ->
//                val selectedItem = result[position]
////                val selectedUrl = "$currentDirectoryUrl$selectedItem"
//
//                val selectedUrl = "$currentDirectoryUrl$selectedItem"
//
//                if (selectedUrl.endsWith("/")) {
//                    navigateToSubfolder(selectedUrl)
//                } else if (selectedUrl.endsWith(".mp4")) {
////                    openVideo(selectedUrl, selectedItem)
//                    // Create an ArrayList with all video URLs and start VideoPlaybackActivity
//                    val videoUrls = result
//                        .filter { it.endsWith(".mp4")   }
//                        .map { "$currentDirectoryUrl$it" } as ArrayList<String>
//
//                    val intent = Intent(this, VideoPlaybackActivity::class.java)
//
////                    intent.putStringArrayListExtra("videoUrls", videoUrls)
////                    startActivity(intent)
//                    // Pass the current video's position to VideoPlaybackActivity
//                    val selectedVideoPosition = videoUrls.indexOf(selectedUrl)
//                    intent.putStringArrayListExtra("videoUrls", videoUrls)
//                    intent.putExtra("currentVideoPosition", selectedVideoPosition)
//
//                    startActivity(intent)
//                }
//                // In your MainActivity when starting VideoPlaybackActivity
//
//
//            }
//        }
//    }
//
//
//    private fun navigateToSubfolder(folderUrl: String) {
//        directoryStack.add(currentDirectoryUrl)
//        currentDirectoryUrl = folderUrl
//    }
//
//    private fun openVideo(fileUrl: String, videoName: String) {
//        val selectedFileUrl = currentDirectoryUrl + videoName
//        if (selectedFileUrl.endsWith(".mp4")) {
//            val intent = Intent(this, VideoPlaybackActivity::class.java)
//            intent.putExtra("videoUrl", selectedFileUrl)
//            startActivity(intent)
//        }
//    }
//
//
//    override fun onBackPressed() {
//        if (directoryStack.isNotEmpty()) {
//            currentDirectoryUrl = directoryStack.removeAt(directoryStack.size - 1)
//        } else {
//            super.onBackPressed()
//        }
//    }
//}
////in my given code we need to hide the extension name in video files butwhen we play then they play is this possible




//package com.example.module
//
//import android.net.Uri
//import android.os.Bundle
//import android.os.Handler
//import android.os.StrictMode
//import android.widget.ArrayAdapter
//import android.widget.ListView
//import android.widget.Toast
//import android.widget.VideoView
//import androidx.appcompat.app.AppCompatActivity
//import org.jsoup.Jsoup
//import java.io.IOException
//import java.util.regex.Pattern
//
//class MainActivity : AppCompatActivity() {
//
//    private lateinit var listView: ListView
//    private lateinit var videoView: VideoView
//    private val directoryUrl = "http://192.168.11.54/pps-app/kidszone/type1/"
//    private val result = ArrayList<String>()
//    private val refreshHandler = Handler()
//    private val refreshIntervalMillis = 2000 // 2 seconds
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//
//        listView = findViewById(R.id.listView)
//        videoView = findViewById(R.id.videoView)
//
//        // Allow network operations on the main thread (for demonstration purposes only)
//        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
//        StrictMode.setThreadPolicy(policy)
//
//        fetchFileList()
//        setupListView()
//
//        // Start the background thread for data refresh
//        startDataRefreshThread()
//    }
//
//    private fun startDataRefreshThread() {
//        Thread {
//            while (true) {
//                // Implement the refresh logic here
//                fetchFileList()
//                updateUIAfterRefresh()
//                Thread.sleep(refreshIntervalMillis.toLong())
//            }
//        }.start()
//    }
//
//    private fun fetchFileList() {
//        try {
//            val doc = Jsoup.connect(directoryUrl).get()
//            val links = doc.select("a[href]")
//            result.clear()
//
//            for (link in links) {
//                val href = link.attr("href")
//                if (!href.contains("..")) {
//                    val decodedName = Uri.decode(href)
//                    result.add(decodedName)
//                }
//            }
//
//            result.sortWith(Comparator { s1, s2 ->
//                val pattern = Pattern.compile("\\d+")
//                val matcher1 = pattern.matcher(s1)
//                val matcher2 = pattern.matcher(s2)
//
//                while (matcher1.find() && matcher2.find()) {
//                    val alphabeticPart1 = s1.split(matcher1.group())[0]
//                    val alphabeticPart2 = s2.split(matcher2.group())[0]
//
//                    if (alphabeticPart1 != alphabeticPart2) {
//                        return@Comparator alphabeticPart1.compareTo(alphabeticPart2)
//                    }
//
//                    val numericPart1 = matcher1.group().toInt()
//                    val numericPart2 = matcher2.group().toInt()
//
//                    if (numericPart1 != numericPart2) {
//                        return@Comparator numericPart1 - numericPart2
//                    }
//                }
//
//                s1.compareTo(s2)
//            })
//
//        } catch (e: IOException) {
//            e.printStackTrace()
//        }
//    }
//
//    private fun setupListView() {
//        val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, result)
//        listView.adapter = adapter
//
//        listView.setOnItemClickListener { _, _, position, _ ->
//            val selectedFileUrl = directoryUrl + result[position]
//            if (selectedFileUrl.endsWith(".mp4")) {
//                playVideo(selectedFileUrl)
//                Toast.makeText(this, "Playing video: ${result[position]}", Toast.LENGTH_SHORT).show()
//            }
//        }
//    }
//
//    private fun playVideo(fileUrl: String) {
//        videoView.setVideoURI(Uri.parse(fileUrl))
//        videoView.start()
//        videoView.visibility = VideoView.VISIBLE
//    }
//
//    private fun updateUIAfterRefresh() {
//        runOnUiThread {
//            val adapter = listView.adapter as ArrayAdapter<*>
//            adapter.notifyDataSetChanged()
//        }
//    }
//}








//package com.example.module

//import android.net.Uri
//import android.os.Bundle
//import android.os.Handler
//import android.os.StrictMode
//import android.widget.ArrayAdapter
//import android.widget.ListView
//import android.widget.Toast
//import android.widget.VideoView
//import androidx.appcompat.app.AppCompatActivity
//import org.jsoup.Jsoup
//import java.io.IOException
//import java.util.regex.Pattern
//
//class MainActivity : AppCompatActivity() {
//
//    private lateinit var listView: ListView
//    private lateinit var videoView: VideoView
//    private val directoryUrl = "http://192.168.11.54/pps-app/kidszone/type1/"
//    private val result = ArrayList<String>()
//    private val refreshHandler = Handler()
//    private val refreshIntervalMillis = 2000 // 2 seconds
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//
//
//
//        listView = findViewById(R.id.listView)
//        videoView = findViewById(R.id.videoView)
//
//        // Allow network operations on the main thread (for demonstration purposes only)
//        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
//        StrictMode.setThreadPolicy(policy)
//
//        fetchFileList()
//        setupListView()
//
//        // Schedule automatic refresh every 60 seconds
//        scheduleAutomaticRefresh()
//    }
//
//    private fun scheduleAutomaticRefresh() {
//        refreshHandler.postDelayed({
//            refreshFileList()
//            scheduleAutomaticRefresh()
//        }, refreshIntervalMillis.toLong())
//    }
//
//    private fun fetchFileList() {
//        try {
//            val doc = Jsoup.connect(directoryUrl).get()
//            val links = doc.select("a[href]")
//            result.clear() // Clear the previous list
//
//            for (link in links) {
//                val href = link.attr("href")
//                // Filter out parent directory (..) and other unwanted links
//                if (!href.contains("..")) {
//                    // URL-decode the name
//                    val decodedName = Uri.decode(href)
//                    result.add(decodedName)
//                }
//            }
//
//            // Sort the files to handle numbers correctly
//            result.sortWith(Comparator { s1, s2 ->
//                val pattern = Pattern.compile("\\d+")
//                val matcher1 = pattern.matcher(s1)
//                val matcher2 = pattern.matcher(s2)
//
//                while (matcher1.find() && matcher2.find()) {
//
//                    val alphabeticPart1 = s1.split(matcher1.group())[0]
//                    val alphabeticPart2 = s2.split(matcher2.group())[0]
//
//                    if (alphabeticPart1 != alphabeticPart2) {
//                        return@Comparator alphabeticPart1.compareTo(alphabeticPart2)
//                    }
//
//                    val numericPart1 = matcher1.group().toInt()
//                    val numericPart2 = matcher2.group().toInt()
//
//                    if (numericPart1 != numericPart2) {
//                        return@Comparator numericPart1 - numericPart2
//                    }
//                }
//
//                s1.compareTo(s2)
//            })
//
//        } catch (e: IOException) {
//            e.printStackTrace()
//        }
//    }
//
//    private fun setupListView() {
//        val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, result)
//        listView.adapter = adapter
//
//        listView.setOnItemClickListener { _, _, position, _ ->
//            val selectedFileUrl = directoryUrl + result[position]
//            if (selectedFileUrl.endsWith(".mp4")) {
//                openVideo(selectedFileUrl, result[position])
//            }
//        }
//    }
//
//    private fun openVideo(fileUrl: String, videoName: String) {
//        videoView.setVideoURI(Uri.parse(fileUrl))
//        videoView.start()
//        videoView.visibility = VideoView.VISIBLE
//        Toast.makeText(this, "Playing video: $videoName", Toast.LENGTH_SHORT).show()
//    }
//
//    private fun refreshFileList() {
//        // Implement the refresh logic here
//        fetchFileList()
//        val adapter = listView.adapter as ArrayAdapter<*>
//        adapter.notifyDataSetChanged()
//        videoView.visibility = VideoView.GONE
//    }
//
//    override fun onDestroy() {
//        super.onDestroy()
//        // Remove any pending refresh callbacks when the activity is destroyed
//        refreshHandler.removeCallbacksAndMessages(null)
//    }
//}





//
//import android.net.Uri
//import android.os.Bundle
//import android.os.Handler
//import android.os.StrictMode
//import android.widget.ArrayAdapter
//import android.widget.ListView
//import android.widget.Toast
//import android.widget.VideoView
//import androidx.appcompat.app.AppCompatActivity
//import org.jsoup.Jsoup
//import java.io.IOException
//
//class MainActivity : AppCompatActivity() {
//
//    private lateinit var listView: ListView
//    private lateinit var videoView: VideoView
//    private val directoryUrl = "http://192.168.11.54/pps-app/kidszone/type1/"
//    private val result = ArrayList<String>()
//    private val refreshHandler = Handler()
//    private val refreshIntervalMillis = 2000 // 2 seconds
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//
//        listView = findViewById(R.id.listView)
//        videoView = findViewById(R.id.videoView)
//
//        // Allow network operations on the main thread (for demonstration purposes only)
//        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
//        StrictMode.setThreadPolicy(policy)
//
//        fetchFileList()
//        setupListView()
//
//        // Schedule automatic refresh every 60 seconds
//        scheduleAutomaticRefresh()
//    }
//
//    private fun scheduleAutomaticRefresh() {
//        refreshHandler.postDelayed({
//            refreshFileList()
//            scheduleAutomaticRefresh()
//        }, refreshIntervalMillis.toLong())
//    }
//
//    private fun fetchFileList() {
//        try {
//            val doc = Jsoup.connect(directoryUrl).get()
//            val links = doc.select("a[href]")
//            result.clear() // Clear the previous list
//            for (link in links) {
//                val href = link.attr("href")
//                // Filter out parent directory (..) and other unwanted links
//                if (!href.contains("..")) {
////                    result.add(href)
//                    ////this line give video name without counting space value
//                    val decodedName = Uri.decode(href) // URL-decode the name
//                    result.add(decodedName)
//                }
//            }
//        } catch (e: IOException) {
//            e.printStackTrace()
//        }
//    }
//
//    private fun setupListView() {
//        val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, result)
//        listView.adapter = adapter
//
//        listView.setOnItemClickListener { _, _, position, _ ->
//            val selectedFileUrl = directoryUrl + result[position]
//            if (selectedFileUrl.endsWith(".mp4")) {
//                openVideo(selectedFileUrl, result[position])
//            }
//        }
//    }
//
//    private fun openVideo(fileUrl: String, videoName: String) {
//        videoView.setVideoURI(Uri.parse(fileUrl))
//        videoView.start()
//        videoView.visibility = VideoView.VISIBLE
//        Toast.makeText(this, "Playing video: $videoName", Toast.LENGTH_SHORT).show()
//    }
//
//    private fun refreshFileList() {
//        // Implement the refresh logic here
//        fetchFileList()
//        val adapter = listView.adapter as ArrayAdapter<*>
//        adapter.notifyDataSetChanged()
//        videoView.visibility = VideoView.GONE
////        Toast.makeText(this, "File list refreshed", Toast.LENGTH_SHORT).show()
//    }
//
//    override fun onDestroy() {
//        super.onDestroy()
//        // Remove any pending refresh callbacks when the activity is destroyed
//        refreshHandler.removeCallbacksAndMessages(null)
//    }
//}













//import android.net.Uri
//import android.os.Bundle
//import android.os.StrictMode
//import android.widget.ArrayAdapter
//import android.widget.Button
//import android.widget.ListView
//import android.widget.Toast
//import android.widget.VideoView
//import androidx.appcompat.app.AppCompatActivity
//import org.jsoup.Jsoup
//import java.io.IOException
//
//class MainActivity : AppCompatActivity() {
//
//    private lateinit var listView: ListView
//    private lateinit var refreshButton: Button
//    private lateinit var videoView: VideoView
//    private val directoryUrl = "http://192.168.11.54/pps-app/kidszone/type1/"
//    private val result = ArrayList<String>()
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//
//        listView = findViewById(R.id.listView)
//        refreshButton = findViewById(R.id.refreshButton)
//        videoView = findViewById(R.id.videoView)
//
//        // Allow network operations on the main thread (for demonstration purposes only)
//        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
//        StrictMode.setThreadPolicy(policy)
//
//        refreshButton.setOnClickListener {
//            refreshFileList()
//        }
//
//        fetchFileList()
//        setupListView()
//    }
//
//    private fun fetchFileList() {
//        try {
//            val doc = Jsoup.connect(directoryUrl).get()
//            val links = doc.select("a[href]")
//            result.clear() // Clear the previous list
//            for (link in links) {
//                val href = link.attr("href")
//                // Filter out parent directory (..) and other unwanted links
//                if (!href.contains("..")) {
//                    result.add(href)
//                }
//            }
//        } catch (e: IOException) {
//            e.printStackTrace()
//        }
//    }
//
//    private fun setupListView() {
//        val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, result)
//        listView.adapter = adapter
//
//        listView.setOnItemClickListener { _, _, position, _ ->
//            val selectedFileUrl = directoryUrl + result[position]
//            if (selectedFileUrl.endsWith(".mp4")) {
//                openVideo(selectedFileUrl, result[position])
//            }
//        }
//    }
//
//    private fun openVideo(fileUrl: String, videoName: String) {
//        videoView.setVideoURI(Uri.parse(fileUrl))
//        videoView.start()
//        videoView.visibility = VideoView.VISIBLE
//        Toast.makeText(this, "Playing video: $videoName", Toast.LENGTH_SHORT).show()
//    }
//
//    private fun refreshFileList() {
//        // Implement the refresh logic here
//        fetchFileList()
//        val adapter = listView.adapter as ArrayAdapter<*>
//        adapter.notifyDataSetChanged()
//        videoView.visibility = VideoView.GONE
//        Toast.makeText(this, "File list refreshed", Toast.LENGTH_SHORT).show()
//    }
//}

















///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//import android.content.Intent
//import android.net.Uri
//import android.os.Bundle
//import android.os.StrictMode
//import android.widget.ArrayAdapter
//import android.widget.Button
//import android.widget.ListView
//import android.widget.Toast
//import androidx.appcompat.app.AppCompatActivity
//import org.jsoup.Jsoup
//import java.io.IOException
//
//class MainActivity : AppCompatActivity() {
//
//    private lateinit var listView: ListView
//    private lateinit var refreshButton: Button
//    private val directoryUrl = "http://192.168.11.54/pps-app/kidszone/type1/"
//    private val result = ArrayList<String>()
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//
//        listView = findViewById(R.id.listView)
//        refreshButton = findViewById(R.id.refreshButton)
//
//        // Allow network operations on the main thread (for demonstration purposes only)
//        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
//        StrictMode.setThreadPolicy(policy)
//
//        refreshButton.setOnClickListener {
//            refreshFileList()
//        }
//
//        fetchFileList()
//        setupListView()
//    }
//
//    private fun fetchFileList() {
//        try {
//            val doc = Jsoup.connect(directoryUrl).get()
//            val links = doc.select("a[href]")
//            result.clear() // Clear the previous list
//            for (link in links) {
//                val href = link.attr("href")
//                // Filter out parent directory (..) and other unwanted links
//                if (!href.contains("..")) {
//                    result.add(href)
//                }
//            }
//        } catch (e: IOException) {
//            e.printStackTrace()
//        }
//    }
//
//    private fun setupListView() {
//        val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, result)
//        listView.adapter = adapter
//
//        listView.setOnItemClickListener { _, _, position, _ ->
//            val selectedFileUrl = directoryUrl + result[position]
//            openFile(selectedFileUrl)
//        }
//    }
//
//    private fun openFile(fileUrl: String) {
//        val intent = Intent(Intent.ACTION_VIEW)
//        intent.data = Uri.parse(fileUrl)
//        startActivity(intent)
//    }
//
//    private fun refreshFileList() {
//        // Implement the refresh logic here
//        fetchFileList()
//        val adapter = listView.adapter as ArrayAdapter<*>
//        adapter.notifyDataSetChanged()
//        Toast.makeText(this, "File list refreshed", Toast.LENGTH_SHORT).show()
//    }
//}












///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

//import android.content.Intent
//import android.net.Uri
//import android.os.Bundle
//import android.os.StrictMode
//import android.widget.ArrayAdapter
//import android.widget.ListView
//import androidx.appcompat.app.AppCompatActivity
//import org.jsoup.Jsoup
//import java.io.IOException
//
//class MainActivity : AppCompatActivity() {
//
//    private lateinit var listView: ListView
//    private val directoryUrl = "http://192.168.11.54/pps-app/kidszone/type1/"
//    private val result = ArrayList<String>()
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//
//        listView = findViewById(R.id.listView)
//
//        // Allow network operations on the main thread (for demonstration purposes only)
//        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
//        StrictMode.setThreadPolicy(policy)
//
//        fetchFileList()
//        setupListView()
//    }
//
//    private fun fetchFileList() {
//        try {
//            val doc = Jsoup.connect(directoryUrl).get()
//            val links = doc.select("a[href]")
//            for (link in links) {
//                val href = link.attr("href")
//                // Filter out parent directory (..) and other unwanted links
//                if (!href.contains("..")) {
//                    result.add(href)
//                }
//            }
//        } catch (e: IOException) {
//            e.printStackTrace()
//        }
//    }
//
//    private fun setupListView() {
//        val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, result)
//        listView.adapter = adapter
//
//        listView.setOnItemClickListener { _, _, position, _ ->
//            val selectedFileUrl = directoryUrl + result[position]
//            openFile(selectedFileUrl)
//        }
//    }
//
//    private fun openFile(fileUrl: String) {
//        val intent = Intent(Intent.ACTION_VIEW)
//        intent.data = Uri.parse(fileUrl)
//        startActivity(intent)
//    }
//}



//
//
////
//////import android.os.Bundle
//////import androidx.appcompat.app.AppCompatActivity
//////
//////class MainActivity : AppCompatActivity() {
//////    override fun onCreate(savedInstanceState: Bundle?) {
//////        super.onCreate(savedInstanceState)
//////        setContentView(R.layout.activity_main)
//////    }
//////}