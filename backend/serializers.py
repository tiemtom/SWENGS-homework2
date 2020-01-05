from rest_framework import serializers

from homework2.backend.models import Person, Manufacturer, Car


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'name', 'date_of_birth']


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ['id', 'name', 'country', 'founding_date', 'turnover', 'ceo']


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'name', 'license_plate', 'manufacturer', 'build_date', 'distance_driven', 'damaged']


class CarListSerializer(serializers.ModelSerializer):
    manufacturer_name = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = ['id', 'name', 'manufacturer_name', 'build_date', 'distance_driven', 'damaged']

    def get_manufacturer_name(self, obj):
        return obj.manufacturer.name if obj.manufacturer else ''


class ManufacturerListSerializer(serializers.ModelSerializer):
    ceo_name = serializers.SerializerMethodField()

    class Meta:
        model = Manufacturer
        fields = ['id', 'name', 'country', 'founding_date', 'turnover', 'ceo_name']

    def get_ceo_name(self, obj):
        return obj.ceo.name if obj.ceo else ''


class ManufacturerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ['id', 'name']


class PersonOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'name']


class ManufacturerCeoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ['id', 'ceo']
