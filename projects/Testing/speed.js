let N = 0;
let B = 1_000_000_000;
for (I = 0; I < B; I++) {
    N++;
    console.log(`${N} %${(N / B) * 100}`);
}