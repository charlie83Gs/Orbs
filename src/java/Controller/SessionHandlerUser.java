/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

/**
 *
 * @author charli83
 */

import Model.User;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.websocket.Session;

import javax.enterprise.context.ApplicationScoped;
import javax.json.JsonObject;

@ApplicationScoped
public class SessionHandlerUser {
    private final Set<Session> sessions = new HashSet<>();
    private final Set<User> users = new HashSet<>();
    
      
    public void addSession(Session session) {
        sessions.add(session);
    }

    public void removeSession(Session session) {
        sessions.remove(session);
    }
    
    public List<User> getDevices() {
        return new ArrayList<>(users);
    }

    public void addUser(User user) {
    }

    public void removeUser(int id) {
    }


    private User getUserById(int id) {
        return null;
    }

    private JsonObject createAddMessage(User user) {
        return null;
    }

    private void sendToAllConnectedSessions(JsonObject message) {
        
    }

    private void sendToSession(Session session, JsonObject message) {
        
    }
}
