from rest_framework import serializers

class PingPongSerializer(serializers.Serializer):
   ping = serializers.CharField()