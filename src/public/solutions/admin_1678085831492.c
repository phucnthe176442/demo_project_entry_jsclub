#include<stdio.h>


int main() {
    int tong = 0;
    int i;
	for(i = 1; i <= 6; ++i) {
        int x;
        scanf("%d", &x);
        tong += x;
	}
    printf("%d", tong);
}

