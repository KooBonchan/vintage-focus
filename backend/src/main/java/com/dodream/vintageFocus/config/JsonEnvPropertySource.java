package com.dodream.vintageFocus.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.env.MapPropertySource;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class JsonEnvPropertySource extends MapPropertySource {

    public JsonEnvPropertySource(String name, String jsonEnvVar) throws IOException {
        super(name, parseJsonToProperties(jsonEnvVar));
    }

    private static Map<String, Object> parseJsonToProperties(String jsonEnvVar) throws IOException {
        Map<String, Object> properties = new HashMap<>();
        if (jsonEnvVar == null || jsonEnvVar.trim().isEmpty()) {
            return properties;
        }

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(jsonEnvVar);

        // Flatten the JSON structure into dot-separated property names
        flattenJsonNode("oauth2", rootNode, properties);

        return properties;
    }

    private static void flattenJsonNode(String prefix, JsonNode node, Map<String, Object> properties) {
        if (node.isObject()) {
            Iterator<Map.Entry<String, JsonNode>> fields = node.fields();
            while (fields.hasNext()) {
                Map.Entry<String, JsonNode> field = fields.next();
                String newPrefix = prefix.isEmpty() ? field.getKey() : prefix + "." + field.getKey();
                flattenJsonNode(newPrefix, field.getValue(), properties);
            }
        } else if (node.isValueNode()) {
            properties.put(prefix, node.asText());
        }
    }
}