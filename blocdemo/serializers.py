from rest_framework import serializers

class PingPongSerializer(serializers.Serializer):
   ping = serializers.CharField()

class AnalyzeUserSerializer(serializers.Serializer):
   username = serializers.CharField()