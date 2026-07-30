from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import Course, Question, Choice

def submit(request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    
    if request.method == 'POST':
        score = 0
        # Iterar sobre las respuestas enviadas en el formulario
        for key, value in request.POST.items():
            if key.startswith('question_'):
                question_id = key.split('_')[1]
                try:
                    selected_choice = Choice.objects.get(pk=value)
                    # Si la respuesta es correcta, sumamos los puntos de esa pregunta
                    if selected_choice.is_correct:
                        question = Question.objects.get(pk=question_id)
                        score += question.grade
                except (Choice.DoesNotExist, Question.DoesNotExist):
                    continue
        
        # Guardamos el puntaje en la sesión del usuario para usarlo en la siguiente vista
        request.session['exam_score'] = score
        return redirect('show_exam_result', course_id=course.id)
        
    # Si no es POST, regresamos a los detalles del curso (asumiendo que tu vista se llama así)
    return redirect('course_details', course_id=course.id)

def show_exam_result(request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    
    # Recuperamos el puntaje guardado en la sesión (o 0 si no hay)
    score = request.session.get('exam_score', 0)
    
    # Supongamos que se aprueba con un puntaje mayor a 80
    passed = score >= 80 
    
    context = {
        'course': course,
        'score': score,
        'passed': passed
    }
    
    # Renderizamos la plantilla de resultados (asegúrate de tener un exam_result.html)
    return render(request, 'exam_result.html', context)
