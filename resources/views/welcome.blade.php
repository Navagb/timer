<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <title>Laravel</title>
        <script src="js/main.js"></script>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        

        <!-- Styles -->
        <link rel="stylesheet" href="css/main.css">        

      
    </head>
    <body class="antialiased" >
        <div class="relative">
            @if (Route::has('login'))
                <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    @auth
                        <a href="{{ url('/home') }}" class="text-sm text-gray-700 underline">Home</a>
                    @else
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a>
                        @endif
                    @endif
                </div>
            @endif
            <h1>Timer</h1>
            <form action="" id="settime">
               
                    <div class="hour">
                        <label for="hour">Hour</label>
                        <input type="number" name="hour" id="hour" placeholder="0" min="0">
                    </div>
                    <div class="minute">
                        <label for="minute">Minute</label>
                        <input type="number" min="0" max="60" id="minute" name="minute"placeholder="0">
                    </div>
                    <div class="second">
                        <label for="second">Second</label>
                        <input type="number" min="0" max="60" id="second" name="second" placeholder="0">
                    </div>
                
               

            </form>
            <div class="submit">
            @csrf
                <button id="start" onclick="startTime()">Start</button>
                <button id="stop" onclick="stopTime()">Stop</button>
                <button id="reset" onclick="resetTime()">Reset</button>
            </div>
            <div class="output">
                <svg class="progress-ring" width="220" height="220">
                    <circle class="progress-ring-circle" stroke="#fff" stroke-width="7" cx="110" cy="110"  r="96" fill="transparent"/>
                </svg>
            
            <div class="output-time">
                <span id="out-h">00</span>
                <span id="out-m">00</span>
                <span id="out-s">00</span>
            </div>
            </div>

            <div id="table">
                <table>
                    <thead>
                        <tr>
                            <th>Timers </th>
                            <th>Started</th>
                            <th>Finished</th>
                        </tr>
                    </thead>
                    <tbody >
                        @foreach($timers as $timer)
                        <tr>
                            <td >{{$timer->value}}</td>
                            <td>{{$timer->started}}</td>
                            <td >{{$timer->finished}}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            
        </div>
        
        <script>
            
            document.addEventListener("DOMContentLoaded", ready);
        </script>
    </body>
</html>
