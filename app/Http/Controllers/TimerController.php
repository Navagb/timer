<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Timer ;
class TimerController extends Controller
{
    public function store(){

        $timer =  new Timer() ; 
        
        $timer->value = request('value') ;
        $timer->started = request('started') ;
        $timer->finished = request('finished') ;
        $timer->save();
        return redirect('/'); 
    }
    public function index(){
        $timers = Timer::all() ;  
        return view('welcome' , ['timers'=> $timers]) ; 
    }
}
