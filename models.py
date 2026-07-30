from django.db import models
from django.conf import settings

# Asumiendo que tienes un modelo Lesson previamente definido
class Lesson(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    
    def __str__(self):
        return self.title

class Question(models.Model):
    # Relación uno a muchos: Una lección puede tener muchas preguntas
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    question_text = models.CharField(max_length=1000)
    grade = models.IntegerField(default=1)

    def __str__(self):
        return self.question_text

class Choice(models.Model):
    # Relación uno a muchos: Una pregunta tiene varias opciones de respuesta
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=1000)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.choice_text

class Submission(models.Model):
    # Relaciona al usuario (o su inscripción) con las respuestas enviadas
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # Relación muchos a muchos: Un envío contiene múltiples elecciones
    choices = models.ManyToManyField(Choice)
    
    def __str__(self):
        return f"Submission by {self.user.username}"
