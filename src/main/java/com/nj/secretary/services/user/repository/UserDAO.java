package com.nj.secretary.services.user.repository;

import com.nj.secretary.services.user.domain.User;

import java.util.List;

//회원관리 CRUD 추상화/캡슐화한 DAO Interface Definition
public interface UserDAO {

    //Insert
    public void addUser(User user) throws Exception;

    //Select One : 로그인, 내정보보기
    public User getUser(String userId) throws Exception;

    //Select One : 아이디 찾기
    public User findUserId(String userName) throws Exception;

    //Select One : 비밀번호 찾기
   // public User findUserPassword() throws Exception;

    //Select List
    public List<User> getUserList() throws Exception;

    //Update
    public void updateUser() throws Exception;

    //Delete
    public int deleteUser() throws Exception;

    //idCheck
    public int idCheck(String userId) throws Exception;

}
