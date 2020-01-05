from django.db import models


# Create your models here.

class Person(models.Model):
    name = models.TextField()
    date_of_birth = models.DateField()

    def __str__(self):
        return self.name


class Manufacturer(models.Model):
    name = models.TextField()
    country = models.TextField()
    founding_date = models.DateField()
    turnover = models.IntegerField()
    ceo = models.OneToOneField(Person, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Car(models.Model):
    name = models.TextField()
    license_plate = models.TextField()
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    build_date = models.DateField()
    distance_driven = models.FloatField()
    damaged = models.BooleanField()

    def __str__(self):
        return self.name + " " + self.license_plate
