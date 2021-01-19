package com.nj.secretary.services.calendar.controller;

import com.nj.secretary.services.calendar.domain.Calendar;
import com.nj.secretary.services.calendar.service.CalendarService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restCalendar/*")
public class CalendarRestController {

    @Autowired
    CalendarService calendarService;

    @GetMapping("getCalendarList")
    public List<Calendar> getCalendarList(@RequestParam("startDate") String start,
                                      @RequestParam("endDate") String end){
        System.out.println("getCalendarList Rest Start");
        Calendar calendar = new Calendar();
        calendar.setStart(start);
        calendar.setEnd(end);
        calendar.setUsername("윤도영");
        System.out.println(calendar);
        List<Calendar> list = calendarService.getCalendarList(calendar);

//        //JSONObject 만들기
//        for(Calendar test:list){
//            JSONObject jsonObject = new JSONObject(test);
//            System.out.println(jsonObject);
//        }
//
//        //JSONArray 만들기
//        JSONArray jsonArray = new JSONArray(list);
//        System.out.println(jsonArray);

        return list;
    }

    @PostMapping("addCalendar")
    public void addCalendar(@RequestBody Calendar calendar){
        System.out.println(calendar);
        System.out.println("addCalendar Start.");
        calendar.setStart(calendar.getStart().replace(" ","T"));    //for FullCalendar format
        calendar.setEnd(calendar.getEnd().replace(" ","T"));    //for FullCalendar format
        System.out.println(calendar);
        calendarService.addCalendar(calendar);

    }

    @PostMapping("updateCalendar")
    public void updateCalendar(@RequestBody Calendar calendar){
        System.out.println(calendar);
        System.out.println("updateCalendar Start");
        calendar.setStart(calendar.getStart().replace(" ","T"));    //for FullCalendar format
        calendar.setEnd(calendar.getEnd().replace(" ","T"));    //for FullCalendar format
        System.out.println(calendar);
        calendarService.updateCalendar(calendar);
    }

    @PostMapping("moveCalendar")
    public void moveCalendar(@RequestBody Calendar calendar){   //Calendar move to other date
        System.out.println("TEST : "+calendar);
        calendarService.moveCalendar(calendar);
    }

    @PostMapping("deleteCalendar")
    public void deleteCalendar(@RequestBody Calendar calendar){
        System.out.println(calendar);
        calendarService.deleteCalendar(calendar.getId()); //Delete Calendar
    }

}