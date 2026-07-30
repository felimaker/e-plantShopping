from django.urls import path
from . import views

urlpatterns = [
    # Ruta para enviar el examen
    path('<int:course_id>/submit/', views.submit, name='submit'),
    
    # Ruta para mostrar el resultado del examen
    path('<int:course_id>/exam_result/', views.show_exam_result, name='show_exam_result'),
]
