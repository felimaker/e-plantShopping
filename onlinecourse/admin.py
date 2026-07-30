from django.contrib import admin

# Aquí están las clases importadas (Ajusta 'Course' u otras si tu models.py tiene más)
from .models import Course, Lesson, Question, Choice, Submission, Enrollment, Instructor, Learner


# 1. Implementación de ChoiceInline
class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3  # Muestra 3 opciones por defecto para cada pregunta


# 2. Implementación de QuestionInline
class QuestionInline(admin.StackedInline):
    model = Question
    extra = 1


# 3. Configuración de QuestionAdmin
class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ("question_text", "lesson", "grade")
    search_fields = ["question_text"]


# 4. Configuración de LessonAdmin
class LessonAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    list_display = (
        "title",
        "course",
    )  # Ajusta 'course' si tu modelo Lesson no lo tiene


# Registrando los modelos en el panel
admin.site.register(Course)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
admin.site.register(Submission)
admin.site.register(Enrollment)
admin.site.register(Instructor) # ¡Nuevo!
admin.site.register(Learner)
