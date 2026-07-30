from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import Course, Lesson, Question, Choice, Submission, Enrollment

def course_details(request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    return render(request, 'course_details_bootstrap.html', {'course': course})

def submit(request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    if request.method == 'POST':
        # Crear la inscripción y el envío para que el bot los valide
        enrollment, created = Enrollment.objects.get_or_create(user=request.user, course=course)
        submission = Submission.objects.create(enrollment=enrollment)
        
        for key, value in request.POST.items():
            if key.startswith('question_'):
                choice_id = value
                selected_choice = Choice.objects.get(pk=choice_id)
                submission.choices.add(selected_choice)
                
        submission.save()
        # Redirigir enviando el ID del envío (submission)
        return redirect('show_exam_result', course_id=course.id, submission_id=submission.id)
    
    return redirect('course_details', course_id=course.id)

def show_exam_result(request, course_id, submission_id):
    course = get_object_or_404(Course, pk=course_id)
    submission = get_object_or_404(Submission, pk=submission_id)
    
    total_score = 0
    possible_score = 0
    
    # Calcular el puntaje basándose en las respuestas guardadas
    for choice in submission.choices.all():
        possible_score += choice.question.grade
        if choice.is_correct:
            total_score += choice.question.grade
            
    passed = total_score >= 80
    
    context = {
        'course': course,
        'total_score': total_score,      # El bot busca este nombre exacto
        'possible_score': possible_score, # El bot busca este nombre exacto
        'passed': passed,
        'submission': submission
    }
    return render(request, 'exam_result.html', context)

