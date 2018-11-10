from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import nltk
import json
from django.template import loader
from nltk.tokenize import word_tokenize, sent_tokenize
#decorator to make a function only accessible to registered users
from django.contrib.auth.decorators import login_required
import pusher

# Create your views here.

# initialize the pusher class

pusher_client = pusher.Pusher(
  app_id='638387',
  key='e324515e53bed6b22c9a',
  secret='4127a12590826493b293',
  cluster='ap2',
  ssl=True
)

# login required to access this page. will redirect to admin login page.
@login_required(login_url='/admin/login/')
def chat(request):
    return render(request, "chat.html")

# function to convert messages to it's corresponding nltk tags
def convert_sent_to_postag(sent):
    word_form_of_sent = word_tokenize(sent)
    pos_tagged_word = nltk.pos_tag(word_form_of_sent)
    return pos_tagged_word

# function to broadcast the message to all the clients connected to the application
@csrf_exempt
def broadcast(request):
    nltk_tag = convert_sent_to_postag(request.POST['message'])
    temp = dict(nltk_tag)
    json_string = json.dumps(temp)
    pusher_client.trigger('a_channel', 'an_event', {'name': request.user.username, 'message': request.POST['message']})
    print(request.POST['message'])
    print("nltk_tag: ", temp)
    return HttpResponse("done", {"json_obj": json_string})