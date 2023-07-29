
# from django.dispatch import receiver
# from django.core.mail import send_mail
# from django.contrib.auth.models import User
# from django.db.models.signals import post_save
# from django.conf import settings

# @receiver(post_save, sender=User)
# def send_registration_email(sender, instance, created, **kwargs):
#     if created:
#         subject = 'Welcome to our website!'
#         message = f'Hi {instance.username},\n\nThank you for registering on our website. We hope you enjoy your experience.\n\nBest regards,\nThe Website Team'
#         from_email = settings.EMAIL_HOST_USER
#         recipient_list = [instance.email]

#         send_mail(subject, message, from_email, recipient_list)
