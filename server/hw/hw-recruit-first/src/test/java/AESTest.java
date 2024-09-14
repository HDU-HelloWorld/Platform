import com.hw.common.utils.AESUtil;

public class AESTest {
    public static void main(String[] args) {
        try {
            String originalData = "SensitiveData";
            System.out.println("原始数据: " + originalData);

            // 加密
            String encryptedData = AESUtil.encrypt(originalData);
            System.out.println("加密后的数据: " + encryptedData);

            // 解密
            String decryptedData = AESUtil.decrypt(encryptedData);
            System.out.println("解密后的数据: " + decryptedData);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
