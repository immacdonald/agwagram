from rest_framework import serializers

class AnalyzeUserSerializer(serializers.Serializer):
   username = serializers.CharField()