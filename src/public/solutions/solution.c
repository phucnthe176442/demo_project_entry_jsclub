#include<stdio.h>
long long Func(int n) {
		int i;
	long long a=0;
	long long  b=1;
	long long c=1;

	
    if(n==1){
    	b = 0;    	
	}else if(n==2){
		b = 1;
	}else{
		for( i=3;i<=n;i++){
			c=b;
			b=b*2+a;
			a=c;
		
		}

	}
	return b;
}


int main() {
	int n,i;

	scanf("%d", &n);
	printf("%d", n);
    
}

