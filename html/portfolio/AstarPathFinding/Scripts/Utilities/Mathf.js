class Mathf {
    static Epsilon = 1.175494E-38;
    static Infinity = 1.0 / 0.0;
    static Deg2Rad = 0.01745329;
    static NegativeInfinity = -1.0 / 0.0;
    static PI = 3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342;
    static Rad2Deg = 57.29578;

    static Abs() {

    }
    static Acos() {

    }
    static Approximately() {

    }
    static Asin() {

    }
    static Atan() {

    }
    static Atan2() {

    }
    static Ceil(f) {
        return Math.ceil(f);
    }
    static Clamp(value, min, max) {
        if (value < min)
            value = min;
        else if (value > max)
            value = max;
        return value;
    }
    static Clamp01(value) {
        if (value < 0.0) {
            return 0.0;
        }
        if (value > 1.0) {
            return 1;
        } else {
            return value;
        }
    }
    static Cos() {

    }
    static Exp() {

    }
    static Floor() {

    }
    static Gamma() {

    }
    static Lerp(a,b,t) {
        return a + (b - a) * Mathf.Clamp01(t);
    }
    static Log() {

    }
    static Log10() {

    }
    static Max(a, b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }
    static Min(a, b) {
        if (a > b) {
            return b;
        } else {
            return a;
        }
    }
    
    static Pow() {

    }
    static Repeat() {

    }
    static Round() {

    }
    static Sign() {

    }
    static Sin() {

    }
    static Sqrt() {

    }
    static Tan() {

    }
    static DeltaAngle() {

    }
    static InverseLerp() {

    }
    static LerpAngle() {

    }
    static LerpUnclamped() {

    }
    static MoveTowards() {

    }
    static PerlinNoise() {

    }
    static PingPong() {

    }
    static SmoothDamp() {

    }
    static SmoothStep() {

    }
    static CeilToInt() {

    }
    static FloatToHalf() {

    }
    static FloorToInt() {

    }
    static HalfToFloat() {

    }
    static MoveTowardsAngle() {

    }
    static RoundToInt() {

    }
    static SmoothDampAngle() {

    }
    static ClosestPowerOfTwo() {

    }
    static GammaToLinearSpace() {

    }
    static IsPowerOfTwo() {

    }
    static LinearToGammaSpace() {

    }
    static NextPowerOfTwo() {

    }
    static CorrelatedColorTemperatureToRGB() {

    }

    static DegreeToRadian(degree) {
        let result =  degree * this.PI / 180;
        return result;
    }

    static RadianToDegree(radian) {
        let result =  radian * 180 / this.PI;
        return result;
    }

    static random(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
}