#include<stdio.h>


int main() {
    int n;
    scanf("%d", &n);
    int i, tong = 0;
    for(i = 1; i <= n; ++i) {
        int x;
        scanf("%d", &x);
        tong += x;
    }
    printf("%d", tong);
}

