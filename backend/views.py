# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from homework2.backend.models import Car, Manufacturer, Person
from homework2.backend.serializers import ManufacturerSerializer, CarListSerializer, CarSerializer, \
    ManufacturerListSerializer, ManufacturerOptionSerializer, PersonOptionSerializer, ManufacturerCeoSerializer


@api_view(['GET'])
def car_list(request):
    cars = Car.objects.all()
    serializer = CarListSerializer(cars, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def car_create(request):
    serializer = CarSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def car_update(request, pk):
    try:
        car = Car.objects.get(pk=pk)
    except Car.DoesNotExist:
        return Response({'error': 'Car does not exist.'}, status=404)

    serializer = CarSerializer(car, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['GET', 'DELETE'])
def car_detail(request, pk):
    try:
        car = Car.objects.get(pk=pk)
    except Car.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarSerializer(car)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        car.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def manufacturer_list(request):
    manufacturers = Manufacturer.objects.all()
    serializer = ManufacturerListSerializer(manufacturers, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def manufacturer_create(request):
    serializer = ManufacturerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def manufacturer_update(request, pk):
    try:
        manufacturer = Manufacturer.objects.get(pk=pk)
    except Manufacturer.DoesNotExist:
        return Response({'error': 'Manufacturer does not exist.'}, status=404)

    serializer = ManufacturerSerializer(manufacturer, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['GET', 'DELETE'])
def manufacturer_detail(request, pk):
    try:
        manufacturer = Manufacturer.objects.get(pk=pk)
    except Manufacturer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ManufacturerSerializer(manufacturer)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        manufacturer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def manufacturer_option_list(request):
    manufacturers = Manufacturer.objects.all()
    serializer = ManufacturerOptionSerializer(manufacturers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def person_option_list(request):
    people = Person.objects.all()
    serializer = PersonOptionSerializer(people, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def manufacturer_ceo_id_list(request):
    manufacturers = Manufacturer.objects.all()
    serializer = ManufacturerCeoSerializer(manufacturers, many=True)
    return Response(serializer.data)
