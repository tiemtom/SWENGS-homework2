from django.contrib import admin

# Register your models here.
from homework2.backend.models import Manufacturer, Person, Car


class ManufacturerAdmin(admin.ModelAdmin):
    pass

admin.site.register(Manufacturer, ManufacturerAdmin)
class PersonAdmin(admin.ModelAdmin):
    pass

admin.site.register(Person, PersonAdmin)
class CarAdmin(admin.ModelAdmin):
    pass
admin.site.register(Car, CarAdmin)

