from django.shortcuts import render,redirect
from memorf.models import Memorf
from django.db.models import F
import datetime

# Create your views here.
def index(request):
    # asc(nulls_last=True)
    memot = Memorf.objects.filter(memoState='t').order_by(F('expiredate').asc(nulls_last=True))
    memod = Memorf.objects.filter(memoState='d').order_by(F('expiredate').asc(nulls_last=True))
    memof = Memorf.objects.filter(memoState='f').order_by(F('expiredate').asc(nulls_last=True))
    # today = datetime.date.today()

    if request.method == 'POST':
        memoTitle = request.POST['createTit']
        memoContent = request.POST['createCon']
        expiredate = None
        if request.POST['createED']:
            expiredate = request.POST['createED']

        Memorf.objects.create(memoTitle=memoTitle,memoContent=memoContent,expiredate=expiredate,memoState='t')
        return redirect('/memo')

    return render(request,'memo/index.html',locals())

def update(request,id):
    memo = Memorf.objects.get(memoID=id)
    memo.memoTitle = request.POST['memoTitle']
    memo.memoContent = request.POST['memoContent']
    memo.memoState = request.POST['memoState']

    if request.POST['expiredate']:
        memo.expiredate = request.POST['expiredate']

    memo.save()

    return redirect('/memo')

def archive(request):
    memoa = Memorf.objects.filter(memoState='a').order_by(F('expiredate').asc(nulls_last=True))
    return render(request,'memo/archive.html',locals())