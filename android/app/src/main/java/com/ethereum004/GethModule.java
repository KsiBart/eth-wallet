package com.ethereum004;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import org.ethereum.geth.Geth;
import org.ethereum.geth.KeyStore;
import org.ethereum.geth.Node;
import org.ethereum.geth.NodeConfig;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by banbart on 15.01.2018.
 */

public class GethModule extends ReactContextBaseJavaModule {
    private static final String CONFIG_NODE_ERROR = "CONFIG_NODE_ERROR";
    private static final String START_NODE_ERROR = "START_NODE_ERROR";
    private static final String STOP_NODE_ERROR = "STOP_NODE_ERROR";
    private static final String ETH_DIR = "ethereum";
    private static final String KEY_STORE_DIR = "keystore";
    private static final String STATIC_NODES_FILES_PATH =  "/" + ETH_DIR + "/GethDroid/";
    private static final String STATIC_NODES_FILES_NAME = "static-nodes.json";

    public GethModule(ReactApplicationContext reactContext) {
        super(reactContext);
        initializeNodeConfig();
        this.reactContext = reactContext;
    }

    private ReactApplicationContext reactContext;
    private static NodeConfig ndConfig;
    private KeyStore keyStore;
    private Node node;

    @Override
    public String getName() {
        return "GethModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    private NodeConfig getNodeConfig() {
        return ndConfig;
    }

    private static void setNodeConfig(NodeConfig nc) {
        ndConfig = nc;
    }

    private KeyStore getKeyStore() {
        return keyStore;
    }

    private void setKeyStore(KeyStore keyStore) {
        this.keyStore = keyStore;
    }

    private Node getNode() {
        return node;
    }

    private void setNode(Node node) {
        this.node = node;
    }

    @ReactMethod
    public void nodeConfig(ReadableMap config, Promise promise) {
        try {
            NodeConfig nc = this.getNodeConfig();
            String nodeDir = ETH_DIR;
            String keyStoreDir = KEY_STORE_DIR;
            if (config.hasKey("enodes"))
                this.writeStaticNodesFile(config.getString("enodes"));
            if (config.hasKey("chainID"))
                nc.setEthereumNetworkID(config.getInt("chainID"));
            if (config.hasKey("maxPeers"))
                nc.setMaxPeers(config.getInt("maxPeers"));
            if (config.hasKey("genesis"))
                nc.setEthereumGenesis(config.getString("genesis"));
            if (config.hasKey("nodeDir"))
                nodeDir = config.getString("nodeDir");
            if (config.hasKey("keyStoreDir"))
                keyStoreDir = config.getString("keyStoreDir");
            Node nd = Geth.newNode(getReactApplicationContext()
                    .getFilesDir() + "/" + nodeDir, nc);
            KeyStore ks = new KeyStore(getReactApplicationContext()
                    .getFilesDir() + "/" + keyStoreDir, Geth.LightScryptN, Geth.LightScryptP);
            setNodeConfig(nc);
            this.setKeyStore(ks);
            this.setNode(nd);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(CONFIG_NODE_ERROR, e);
        }
    }

    @ReactMethod
    public void startNode(Promise promise) {
        Boolean result = false;
        try {
            if (node != null) {
                this.getNode().start();

                result = true;
            }
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(START_NODE_ERROR, e);
        }
    }

    @ReactMethod
    public void stopNode(Promise promise) {
        Boolean result = false;
        try {
            if(this.node != null) {
                this.getNode().stop();
                result = true;
            }
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(STOP_NODE_ERROR, e);
        }
    }

    @ReactMethod
    public void listenerAddress(Promise promise) {
        try {
            String listenerAddress = this.getNode().getNodeInfo().getListenerAddress();
            Long discoveryPort = this.getNode().getNodeInfo().getDiscoveryPort();
            String ip = this.getNode().getNodeInfo().getIP();
            Long listenerPort = this.getNode().getNodeInfo().getListenerPort();
            promise.resolve(listenerAddress + " " + String.valueOf(discoveryPort) + " " + ip + " " + String.valueOf(listenerPort));
        } catch (Exception e) {
            promise.reject(STOP_NODE_ERROR, e);
        }
    }

    private static void initializeNodeConfig(){
        try {
            NodeConfig nc = new NodeConfig();
            ndConfig = nc;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void writeStaticNodesFile(String enodes) {
        try {
            File dir = new File(getReactApplicationContext().getFilesDir() + STATIC_NODES_FILES_PATH);
            if (dir.exists() == false) dir.mkdirs();
            File f = new File(dir, STATIC_NODES_FILES_NAME);
            if (f.exists() == false) {
                if(f.createNewFile() == true) {
                    WritableArray staticNodes = new WritableNativeArray();
                    staticNodes.pushString(enodes);
                    Writer output = new BufferedWriter(new FileWriter(f));
                    output.write(staticNodes.toString());
                    output.close();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
