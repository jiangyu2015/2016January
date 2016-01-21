/**
 * jiangyukun on 2016/1/21.
 */
+function (window, undefined) {
    var createjs = window.createjs;

    var Matrix = createjs.Matrix2D;

    var m = new Matrix(2, 0, 0, 3, 5, 7);
    var m1 = m.clone();
    m.invert();
    var m2 = m.appendMatrix(m1);
    console.log(m);
    console.log(m1);
    console.log(m2);
}(window);
