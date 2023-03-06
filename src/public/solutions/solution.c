#include<stdio.h>
int main(){
float i;
float arr[6];
for(i=0;i<6;i++){
scanf("%f", &arr[i]);
}
printf("%f", (arr[0]+arr[1]+arr[2]+arr[3]+arr[4]+arr[5]));
return 0;
}
