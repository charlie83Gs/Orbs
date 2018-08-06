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

import java.io.StringReader;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;

import javax.websocket.server.ServerEndpoint;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;

@ApplicationScoped
@ServerEndpoint("/actions")
public class WebSocketUser {
    @Inject
    private SessionHandlerUser sessionHandler;
    
    @OnOpen
        public void open(Session session) {
            sessionHandler.addSession(session);
    }

    @OnClose
        public void close(Session session) {
            sessionHandler.removeSession(session);
    }

    @OnError
        public void onError(Throwable error) {
            Logger.getLogger(WebSocketUser.class.getName()).log(Level.SEVERE, null, error);
    }

    @OnMessage
        public void handleMessage(String message, Session session) {
             try (JsonReader reader = Json.createReader(new StringReader(message))) {
                JsonObject jsonMessage = reader.readObject();
                if ("update".equals(jsonMessage.getString("action"))) {
                    System.out.println(jsonMessage.toString());
                //int id = (int) jsonMessage.getInt("id");
                //System.out.println("movement");
                /*controlState state = new controlState();
                
                state.setUp(jsonMessage.getBoolean("up"));
                state.setDown(jsonMessage.getBoolean("down"));
                state.setLeft(jsonMessage.getBoolean("left"));
                state.setRight(jsonMessage.getBoolean("right"));*/
                
                //sessionHandler.updatePlayer(session, state);
                
            }
             }
    }
    
}
