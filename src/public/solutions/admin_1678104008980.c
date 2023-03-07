#include<stdio.h>
int main(){
int i;
int tong = 0;
int x;
for(i=0;i<6;i++){
scanf("%d", &x);
tong+=x;
}
printf("%d", tong);
return 0;
}
