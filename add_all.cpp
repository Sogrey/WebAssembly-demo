extern "C" {

long add_all(int count) {
    long result = 0;
    for(int i = 0; i < count; i++){
        result += i;
    }
    return result;
}
}